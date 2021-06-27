import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMaterialRegister from 'common/useMaterialRegister';
import { Student } from 'js-api-client';
import React from 'react';
import { Control } from 'react-hook-form';

export interface StudentFormGeneralProps {
	control: Control<Student>;
	disabled: boolean;
}

const StudentFormGeneral: React.FC<StudentFormGeneralProps> = (props) => {
	const { control, disabled } = props;

	const email = useMaterialRegister(control, 'email');
	const firstName = useMaterialRegister(control, 'firstName');
	const lastName = useMaterialRegister(control, 'lastName');
	const description = useMaterialRegister(control, 'description');
	const github = useMaterialRegister(control, 'githubUrl');
	const yearsOfExperience = useMaterialRegister(control, 'yearsOfExperience', { transformer: 'number' });

	return (
		<>
			<Typography variant="h5">Allgemein</Typography>

			<TextField {...email} variant="outlined" margin="normal" label="E-Mail" fullWidth disabled={disabled} />
			<Grid container spacing={4}>
				<Grid item md={6} xs={12}>
					<TextField
						{...firstName}
						variant="outlined"
						margin="normal"
						label="Vorname"
						fullWidth
						disabled={disabled}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<TextField
						{...lastName}
						variant="outlined"
						margin="normal"
						label="Nachname"
						fullWidth
						disabled={disabled}
					/>
				</Grid>
			</Grid>

			<TextField
				{...description}
				variant="outlined"
				margin="normal"
				label="Beschreibung"
				multiline
				rows={3}
				fullWidth
				disabled={disabled}
			/>

			<Grid container spacing={4}>
				<Grid item md={6} xs={12}>
					<TextField
						{...github}
						variant="outlined"
						margin="normal"
						label="Github Benutzername"
						fullWidth
						disabled={disabled}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<TextField
						{...yearsOfExperience}
						variant="outlined"
						margin="normal"
						label="Jahre Berufserfahrung"
						type="number"
						fullWidth
						disabled={disabled}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default StudentFormGeneral;
