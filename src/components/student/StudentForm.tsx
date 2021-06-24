import Grid from '@material-ui/core/Grid';
import { Student } from 'js-api-client';
import React from 'react';
import { Control } from 'react-hook-form';
import StudentFormAddress from './StudentFormAddress';
import StudentFormGeneral from './StudentFormGeneral';
import StudentFormJob from './StudentFormJob';
import StudentFormUniversity from './StudentFormUniversity';

export interface StudentFormProps {
	control: Control<Student>;
	disabled: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({ control, disabled }) => {
	return (
		<Grid container spacing={4}>
			<Grid item md={6} xs={12}>
				<StudentFormGeneral control={control} disabled={disabled} />
			</Grid>
			<Grid item md={6} xs={12}>
				<StudentFormAddress control={control} disabled={disabled} />
			</Grid>
			<Grid item md={6} xs={12}>
				<StudentFormUniversity control={control} disabled={disabled} />
			</Grid>
			<Grid item md={6} xs={12}>
				<StudentFormJob control={control} disabled={disabled} />
			</Grid>
		</Grid>
	);
};

export default StudentForm;
