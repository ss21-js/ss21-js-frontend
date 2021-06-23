import { joiResolver } from '@hookform/resolvers/joi';
import StepperContainer from 'components/app/StepperContainer';
import StudentFormAddress from 'components/student/StudentFormAddress';
import StudentFormGeneral from 'components/student/StudentFormGeneral';
import StudentFormJob from 'components/student/StudentFormJob';
import StudentFormUniversity from 'components/student/StudentFormUniversity';
import { Address, Student, StudentDto, University } from 'js-api-client';
import { studentSchema } from 'models/joiSchemas';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { currentFirebaseUser, useSignUpStudent } from 'store/auth';
import { WorkArea, WorkBasis } from 'store/jobs';

const OnboardingStudentPage: React.FC = () => {
	const signUpStudent = useSignUpStudent();

	const firebaseUser = useRecoilValue(currentFirebaseUser);

	const [loading, setLoading] = React.useState(false);
	const [student, setStudent] = React.useState<Partial<Student>>({
		email: firebaseUser?.email ?? '',
		workArea: WorkArea.NONE.valueOf(),
		workBasis: WorkBasis.NONE.valueOf(),
		skills: [],
	});
	const [fromAvailable, setFromAvailable] = React.useState<Date | null>();
	const [toAvailable, setToAvailable] = React.useState<Date | null>();

	const { control, getValues, trigger } = useForm<Student>({
		resolver: joiResolver(studentSchema),
		defaultValues: student,
		mode: 'all',
	});

	const handleNext = async (from: number, to: number) => {
		const values = getValues();
		console.log(values);
		setStudent((student) => ({
			...student,
			address: values.address,
			firstName: values.firstName,
			lastName: values.lastName,
			description: values.description,
			email: values.email,
			university: values.university,
			fromAvailable: fromAvailable ?? undefined,
			toAvailable: toAvailable ?? undefined,
			githubUrl: values.githubUrl,
			languages: values.languages,
			skills: values.skills,
			workArea: values.workArea,
			workBasis: values.workBasis,
			semester: values.semester,
			yearsOfExperience: values.yearsOfExperience,
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
				city: student.address?.city ?? '',
				country: student.address?.country ?? '',
				state: student.address?.state ?? '',
				street1: student.address?.street1 ?? '',
				street2: student.address?.street2 ?? '',
				zip: student.address?.zip ?? 0,
			};

			const university: University = {
				name: student.university?.name ?? '',
				homepage: student.university?.homepage ?? '',
			};

			const studentDto: StudentDto = {
				// General
				email: student.email ?? '',
				firstName: student.firstName ?? '',
				lastName: student.lastName ?? '',
				description: student.description ?? '',
				githubUrl: student.githubUrl ?? '',
				yearsOfExperience: student.yearsOfExperience ?? 0,
				university: university,
				semester: parseInt((student.semester ?? 0).toString()),
				// Address
				address: address,
				// Job
				fromAvailable: fromAvailable ?? new Date(),
				toAvailable: toAvailable ?? new Date(),
				languages: student.languages ?? [],
				skills: student.skills ?? [],
				workArea: student.workArea ?? WorkArea.NONE.valueOf(),
				workBasis: parseInt((student.workBasis ?? WorkBasis.NONE.valueOf()).toString()),
			};

			console.log(studentDto);

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
							fromAvailable={fromAvailable}
							fromAvailableChanged={setFromAvailable}
							toAvailable={toAvailable}
							toAvailableChanged={setToAvailable}
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
