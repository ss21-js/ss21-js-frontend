import { joiResolver } from '@hookform/resolvers/joi';
import OnboardingStepper from 'components/onboarding/OnboardingStepper';
import OnboardingStudentProfile from 'components/onboarding/OnboardingStudentProfile';
import StudentFormAddress from 'components/student/StudentFormAddress';
import StudentFormGeneral from 'components/student/StudentFormGeneral';
import StudentFormJob from 'components/student/StudentFormJob';
import StudentFormUniversity from 'components/student/StudentFormUniversity';
import { ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from 'index';
import { Address, Student, StudentDto, University } from 'js-api-client';
import { studentSchema } from 'models/joiSchemas';
import WorkArea from 'models/workArea';
import WorkBasis from 'models/workBasis';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import currentFirebaseUserState from 'store/auth/currentFirebaseUserState';
import useSignUpStudent from 'store/auth/useSignUpStudent';
import useToast from 'common/useToast';
import onboardingStudentState from 'store/onboarding/onboardingStudentState';

const OnboardingStudentPage: React.FC = () => {
	const signUpStudent = useSignUpStudent();
	const toast = useToast();

	const firebaseUser = useRecoilValue(currentFirebaseUserState);

	const [loading, setLoading] = React.useState(false);
	const [student, setStudent] = useRecoilState(onboardingStudentState);

	React.useEffect(() => {
		// Reset images on page refresh because of missing permissions
		setStudent((student) => ({
			...student,
			headerImageUrl: '',
			profileImageUrl: '',
		}));
	}, [setStudent]);

	const [headerFile, setHeaderFile] = React.useState<File | null>(null);
	const [profileFile, setProfileFile] = React.useState<File | null>(null);

	const handleHeaderImage = (file: File, url: string) => {
		setHeaderFile(file);
		setStudent((student) => ({
			...student,
			headerImageUrl: url,
		}));
	};

	const handleProfileImage = (file: File, url: string) => {
		setProfileFile(file);
		setStudent((student) => ({
			...student,
			profileImageUrl: url,
		}));
	};

	const { control, getValues, trigger } = useForm<Student>({
		resolver: joiResolver(studentSchema),
		defaultValues: student,
		mode: 'onBlur',
	});

	const handleChange = async (from: number, to: number) => {
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
		} else if (from === 3) {
			return (
				await Promise.all([
					trigger('workArea'),
					trigger('workBasis'),
					trigger('languages'),
					trigger('skills'),
					trigger('fromAvailable'),
					trigger('toAvailable'),
				])
			).every((v) => v);
		} else if (to === 5) {
			setLoading(true);
			let headerUrl = '';
			let profileUrl = '';

			if (headerFile) {
				const headerRef = ref(firebaseStorage, `images/${firebaseUser?.id}/${headerFile.name}`);
				await uploadBytes(headerRef, headerFile);
				headerUrl = `images/${firebaseUser?.id}/${headerFile.name}`;
			}

			if (profileFile) {
				const profileRef = ref(firebaseStorage, `images/${firebaseUser?.id}/${profileFile.name}`);
				await uploadBytes(profileRef, profileFile);
				profileUrl = `images/${firebaseUser?.id}/${profileFile.name}`;
			}

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
				yearsOfExperience: formStudent.yearsOfExperience ?? 0,
				university: university,
				semester: formStudent.semester ?? 0,
				// Address
				address: address,
				// Job
				fromAvailable: formStudent.fromAvailable ?? new Date(),
				toAvailable: formStudent.toAvailable ?? new Date(),
				languages: formStudent.languages ?? [],
				skills: formStudent.skills ?? [],
				workArea: formStudent.workArea ?? WorkArea.NONE.valueOf(),
				workBasis: parseInt((formStudent.workBasis ?? WorkBasis.NONE.valueOf()).toString()),
				headerImageUrl: headerUrl ?? '',
				profileImageUrl: profileUrl ?? '',
			};

			toast
				.promise(signUpStudent!(studentDto))
				.then(() => {
					//
				})
				.finally(() => setLoading(false));

			return false;
		}

		return true;
	};

	return (
		<OnboardingStepper
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
				{
					label: 'Profilbilder',
					component: (
						<OnboardingStudentProfile
							student={student}
							headerImageChanged={handleHeaderImage}
							profileImageChanged={handleProfileImage}
						/>
					),
				},
			]}
			onChange={handleChange}
		/>
	);
};

export default OnboardingStudentPage;
