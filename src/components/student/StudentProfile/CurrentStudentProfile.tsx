import { Student } from 'js-api-client';
import React from 'react';
import useToast from 'common/useToast';
import useUpdateStudent from 'store/user/useUpdateStudent';
import { ref, uploadBytes } from 'firebase/storage';
import StudentProfile from 'components/student/StudentProfile/StudentProfile';
import { useRecoilValue } from 'recoil';
import currentUserState from 'store/user/currentUserState';
import Center from 'components/layout/Center';
import { firebaseStorage } from '../../../index';
import EditStudentDialog from 'components/student/EditStudentDialog';

const CurrentStudentProfile: React.FC = () => {
	const currentUser = useRecoilValue(currentUserState);
	const student = currentUser as Student | undefined;

	const [editOpen, setEditOpen] = React.useState(false);

	const toast = useToast();
	const updateStudent = useUpdateStudent();

	const uploadFileAndUpdateUrl = async (file: File, key: keyof Student) => {
		const refString = `images/${student!.id}/${file.name}`;
		const fileRef = ref(firebaseStorage, refString);
		await uploadBytes(fileRef, file);
		return updateStudent!({
			...student!,
			description: student!.description ?? '',
			[key]: refString,
		});
	};

	const headerImageChanged = (file: File) => {
		toast.promise(uploadFileAndUpdateUrl(file, 'headerImageUrl'));
	};

	const profileImageChanged = (file: File) => {
		toast.promise(uploadFileAndUpdateUrl(file, 'profileImageUrl')).catch(console.error);
	};

	const handleOpenEdit = () => {
		setEditOpen(true);
	};

	const handleCloseEdit = () => {
		setEditOpen(false);
	};

	if (student === undefined) {
		return <Center>Student nicht gefunden</Center>;
	}

	return (
		<>
			<StudentProfile
				student={student}
				profileImageChanged={profileImageChanged}
				headerImageChanged={headerImageChanged}
				handleOpenEdit={handleOpenEdit}
			/>
			<EditStudentDialog open={editOpen} handleClose={handleCloseEdit} />
		</>
	);
};

export default CurrentStudentProfile;
