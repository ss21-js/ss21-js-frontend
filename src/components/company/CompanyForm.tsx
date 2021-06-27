import Grid from '@material-ui/core/Grid';
import CompanyFormAddress from 'components/company/CompanyFormAddress';
import { Company } from 'js-api-client';
import React from 'react';
import { Control } from 'react-hook-form';
import CompanyFormGeneral from './CompanyFormGeneral';

export interface CompanyFormProps {
	control: Control<Company>;
	disabled: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ control, disabled }) => {
	return (
		<Grid container spacing={4}>
			<Grid item md={5} xs={12}>
				<CompanyFormGeneral control={control} disabled={disabled} />
			</Grid>
			<Grid item md={7} xs={12}>
				<CompanyFormAddress control={control} disabled={disabled} />
			</Grid>
		</Grid>
	);
};

export default CompanyForm;
