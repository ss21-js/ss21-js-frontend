import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useMaterialRegister } from 'common/formUtils';
import { Company } from 'js-api-client';
import React from 'react';
import { Control } from 'react-hook-form';

export interface CompanyFormGeneralProps {
	control: Control<Company>;
	disabled: boolean;
}

const CompanyFormGeneral: React.FC<CompanyFormGeneralProps> = ({ control, disabled }) => {
	const name = useMaterialRegister(control, 'name');
	const info = useMaterialRegister(control, 'companyInfo');
	const homepage = useMaterialRegister(control, 'homepage');
	const email = useMaterialRegister(control, 'email');
	return (
		<>
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
		</>
	);
};

export default CompanyFormGeneral;
