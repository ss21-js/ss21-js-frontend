import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useMaterialRegister } from 'common/formUtils';
import { Company } from 'js-api-client';
import React from 'react';
import { Control } from 'react-hook-form';

export interface CompanyFormProps {
	control: Control<Company>;
	disabled: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ control, disabled }) => {
	const name = useMaterialRegister(control, 'name');
	const info = useMaterialRegister(control, 'companyInfo');
	const homepage = useMaterialRegister(control, 'homepage');
	const email = useMaterialRegister(control, 'email');
	const street1 = useMaterialRegister(control, 'address.street1');
	const street2 = useMaterialRegister(control, 'address.street2');
	const city = useMaterialRegister(control, 'address.city');
	const zip = useMaterialRegister(control, 'address.zip');
	const state = useMaterialRegister(control, 'address.state');
	const country = useMaterialRegister(control, 'address.country');

	return (
		<Grid container spacing={4}>
			<Grid item md={5} xs={12}>
				<Typography variant="h5">Allgemein</Typography>
				<TextField
					{...name}
					variant="outlined"
					margin="normal"
					label="Unternehmensname"
					fullWidth
					disabled={disabled}
				/>
				<TextField
					{...info}
					variant="outlined"
					margin="normal"
					label="Beschreibung"
					multiline
					rows={3}
					fullWidth
					disabled={disabled}
				/>
				<TextField
					{...homepage}
					variant="outlined"
					margin="normal"
					label="Webseite"
					fullWidth
					disabled={disabled}
				/>
				<TextField
					{...email}
					variant="outlined"
					margin="normal"
					label="Öffentliche E-Mail Adresse"
					fullWidth
					disabled={disabled}
				/>
			</Grid>
			<Grid item md={7} xs={12}>
				<Typography variant="h5">Adresse</Typography>
				<TextField
					{...street1}
					variant="outlined"
					margin="normal"
					label="Straße"
					fullWidth
					disabled={disabled}
				/>
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
						<TextField
							{...zip}
							variant="outlined"
							margin="normal"
							label="PLZ"
							fullWidth
							disabled={disabled}
						/>
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
			</Grid>
		</Grid>
	);
};

export default CompanyForm;
