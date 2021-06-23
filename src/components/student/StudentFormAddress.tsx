import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useMaterialRegister } from 'common/formUtils';
import { Student } from 'js-api-client';
import React from 'react';
import { Control } from 'react-hook-form';

export interface StudentFormAddressProps {
	control: Control<Student>;
	disabled: boolean;
}

const StudentFormAddress: React.FC<StudentFormAddressProps> = ({ control, disabled }) => {
	const street1 = useMaterialRegister(control, 'address.street1');
	const street2 = useMaterialRegister(control, 'address.street2');
	const city = useMaterialRegister(control, 'address.city');
	const zip = useMaterialRegister(control, 'address.zip');
	const state = useMaterialRegister(control, 'address.state');
	const country = useMaterialRegister(control, 'address.country');

	return (
		<>
			<Typography variant="h5">Adresse</Typography>
			<TextField {...street1} variant="outlined" margin="normal" label="Straße" fullWidth disabled={disabled} />
			<TextField
				{...street2}
				variant="outlined"
				margin="normal"
				label="Adresszusatz"
				fullWidth
				disabled={disabled}
			/>

			<Grid container spacing={2}>
				<Grid item md={8} xs={12}>
					<TextField
						{...city}
						variant="outlined"
						margin="normal"
						label="Stadt"
						fullWidth
						disabled={disabled}
					/>
				</Grid>
				<Grid item md={4} xs={12}>
					<TextField {...zip} variant="outlined" margin="normal" label="PLZ" fullWidth disabled={disabled} />
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item md={6} xs={12}>
					<TextField
						{...state}
						variant="outlined"
						margin="normal"
						label="Bundesstaat"
						fullWidth
						disabled={disabled}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<TextField
						{...country}
						variant="outlined"
						margin="normal"
						label="Land"
						fullWidth
						disabled={disabled}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default StudentFormAddress;
