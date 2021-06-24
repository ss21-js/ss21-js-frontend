import { joiResolver } from '@hookform/resolvers/joi';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useToast from 'common/useToast';
import StyledButton from 'components/StyledButton';
import { Student, UpdateStudentDto } from 'js-api-client';
import { studentSchema } from 'models/joiSchemas';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import currentUserState from 'store/user/currentUserState';
import useUpdateStudent from 'store/user/useUpdateStudent';
import StudentForm from './StudentForm';

export interface EditStudentDialogProps {
	open: boolean;
	handleClose: () => void;
}

const EditStudentDialog: React.FC<EditStudentDialogProps> = ({ open, handleClose }) => {
	const toast = useToast();
	const [loading, setLoading] = React.useState(false);
	const student = useRecoilValue(currentUserState);

	const updateStudent = useUpdateStudent();

	const { control, handleSubmit, reset } = useForm<Student>({
		resolver: joiResolver(studentSchema),
		defaultValues: student as Student,
		mode: 'all',
	});

	React.useEffect(() => {
		reset(student as Student);
	}, [open, reset, student]);

	const onSubmit = (student: Student) => {
		if (!updateStudent) return;

		setLoading(true);

		const updateStudentDto: UpdateStudentDto = {
			...student,
			description: student.description ?? '',
		};

		toast
			.promise(updateStudent(updateStudentDto))
			.then(() => {
				setLoading(false);
				handleClose();
			})
			.catch(() => {
				setLoading(false);
			});
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="xl" aria-labelledby="edit-student-dialog-title">
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<DialogTitle id="edit-student-dialog-title">Bearbeiten</DialogTitle>
				<DialogContent>
					<StudentForm control={control} disabled={loading} />
				</DialogContent>
				<DialogActions>
					<StyledButton variant="text" onClick={handleClose}>
						Abbrechen
					</StyledButton>
					<StyledButton type="submit" color="primary" loading={loading}>
						Speichern
					</StyledButton>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default EditStudentDialog;
