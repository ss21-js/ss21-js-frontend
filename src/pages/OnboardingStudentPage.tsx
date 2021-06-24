import { joiResolver } from '@hookform/resolvers/joi';
import StepperContainer from 'components/app/StepperContainer';
import StudentFormAddress from 'components/student/StudentFormAddress';
import StudentFormGeneral from 'components/student/StudentFormGeneral';
import StudentFormJob from 'components/student/StudentFormJob';
import StudentFormUniversity from 'components/student/StudentFormUniversity';
import { Address, Student, StudentDto, University } from 'js-api-client';
import { studentSchema } from 'models/joiSchemas';
import WorkArea from 'models/workArea';
import WorkBasis from 'models/workBasis';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import currentFirebaseUserState from 'store/auth/currentFirebaseUserState';
import { useSignUpStudent } from 'store/auth/useSignUpStudent';

const OnboardingStudentPage: React.FC = () => {
	const signUpStudent = useSignUpStudent();

	const firebaseUser = useRecoilValue(currentFirebaseUserState);

	const [loading, setLoading] = React.useState(false);
	const [student, setStudent] = React.useState<Partial<Student>>({
		email: firebaseUser?.email ?? '',
		workArea: WorkArea.NONE.valueOf(),
		workBasis: WorkBasis.NONE.valueOf(),
		skills: [],
	});

	const { control, getValues, trigger } = useForm<Student>({
		resolver: joiResolver(studentSchema),
		defaultValues: student,
	});

	const handleNext = async (from: number, to: number) => {
		const formStudent = getValues();
		setStudent((student) => ({
			...student,
			address: formStudent.address,
			firstName: formStudent.firstName,
			lastName: formStudent.lastName,
			description: formStudent.description,
			email: formStudent.email,
			university: formStudent.university,
			fromAvailable: formStudent.fromAvailable,
			toAvailable: formStudent.toAvailable,
			githubUrl: formStudent.githubUrl,
			languages: formStudent.languages,
			skills: formStudent.skills,
			workArea: formStudent.workArea,
			workBasis: formStudent.workBasis,
			semester: formStudent.semester,
			yearsOfExperience: formStudent.yearsOfExperience,
		}));

		if (from === 0) {
			return (
				await Promise.all([
					trigger('firstName'),
					trigger('lastName'),
					trigger('description'),
					trigger('githubUrl'),
					trigger('yearsOfExperience'),
				])
			).every((v) => v);
		} else if (from === 1) {
			return (
				await Promise.all([trigger('university.name'), trigger('university.homepage'), trigger('semester')])
			).every((v) => v);
		} else if (from === 2) {
			return (
				await Promise.all([
					trigger('address.city'),
					trigger('address.country'),
					trigger('address.state'),
					trigger('address.street1'),
					trigger('address.street2'),
					trigger('address.zip'),
				])
			).every((v) => v);
		} else if (to === 4) {
			setLoading(true);

			const address: Address = {
				city: formStudent.address?.city ?? '',
				country: formStudent.address?.country ?? '',
				state: formStudent.address?.state ?? '',
				street1: formStudent.address?.street1 ?? '',
				street2: formStudent.address?.street2 ?? '',
				zip: formStudent.address?.zip ?? 0,
			};

			const university: University = {
				name: formStudent.university?.name ?? '',
				homepage: formStudent.university?.homepage ?? '',
			};

			const studentDto: StudentDto = {
				// General
				email: formStudent.email ?? '',
				firstName: formStudent.firstName ?? '',
				lastName: formStudent.lastName ?? '',
				description: formStudent.description ?? '',
				githubUrl: formStudent.githubUrl ?? '',
				yearsOfExperience: parseInt((formStudent.yearsOfExperience ?? 0).toString()),
				university: university,
				semester: parseInt((formStudent.semester ?? 0).toString()),
				// Address
				address: address,
				// Job
				fromAvailable: formStudent.fromAvailable ?? new Date(),
				toAvailable: formStudent.toAvailable ?? new Date(),
				languages: formStudent.languages ?? [],
				skills: formStudent.skills ?? [],
				workArea: formStudent.workArea ?? WorkArea.NONE.valueOf(),
				workBasis: parseInt((formStudent.workBasis ?? WorkBasis.NONE.valueOf()).toString()),
			};

			const result = (await signUpStudent?.(studentDto)) ?? false;
			setLoading(false);
			return result;
		}

		return true;
	};

	return (
		<StepperContainer
			steps={[
				{
					label: 'Profil',
					component: <StudentFormGeneral control={control} disabled={loading} />,
				},
				{
					label: 'Universität',
					component: <StudentFormUniversity control={control} disabled={loading} />,
				},
				{
					label: 'Adresse',
					component: <StudentFormAddress control={control} disabled={loading} />,
				},
				{
					label: 'Jobpräferenzen',
					component: (
						<StudentFormJob
							control={control}
							// fromAvailable={fromAvailable}
							// fromAvailableChanged={setFromAvailable}
							// toAvailable={toAvailable}
							// toAvailableChanged={setToAvailable}
							disabled={loading}
						/>
					),
				},
			]}
			next={handleNext}
		/>
	);
};

export default OnboardingStudentPage;
