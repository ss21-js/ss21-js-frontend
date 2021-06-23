import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useMaterialRegister } from 'common/formUtils';
import { Student } from 'js-api-client';
import React from 'react';
import { Control } from 'react-hook-form';

export interface StudentFormUniversityProps {
	control: Control<Student>;
	disabled: boolean;
}

const StudentFormUniversity: React.FC<StudentFormUniversityProps> = ({ control, disabled }) => {
	const name = useMaterialRegister(control, 'university.name');
	const homepage = useMaterialRegister(control, 'university.homepage');
	const semester = useMaterialRegister(control, 'semester');

	return (
		<>
			<Typography variant="h5">Universität/Hochschule</Typography>

			<TextField {...name} variant="outlined" margin="normal" label="Name" fullWidth disabled={disabled} />

			<TextField
				{...homepage}
				variant="outlined"
				margin="normal"
				label="Webseite"
				fullWidth
				disabled={disabled}
			/>

			<TextField
				{...semester}
				variant="outlined"
				margin="normal"
				label="Aktuelles Semester"
				fullWidth
				disabled={disabled}
			/>
		</>
	);
};

export default StudentFormUniversity;
