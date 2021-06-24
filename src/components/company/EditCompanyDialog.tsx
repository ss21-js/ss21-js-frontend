import { joiResolver } from '@hookform/resolvers/joi';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useToast from 'common/useToast';
import StyledButton from 'components/StyledButton';
import { Company } from 'js-api-client';
import { companySchema } from 'models/joiSchemas';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import currentUserState from 'store/user/currentUserState';
import useUpdateCompany from 'store/user/useUpdateCompany';
import CompanyForm from './CompanyForm';

export interface EditCompanyDialogProps {
	open: boolean;
	handleClose: () => void;
}

const EditCompanyDialog: React.FC<EditCompanyDialogProps> = ({ open, handleClose }) => {
	const toast = useToast();
	const [loading, setLoading] = React.useState(false);
	const company = useRecoilValue(currentUserState);

	const updateCompany = useUpdateCompany();

	const { control, handleSubmit, reset } = useForm<Company>({
		resolver: joiResolver(companySchema),
		defaultValues: company as Company,
		mode: 'all',
	});

	React.useEffect(() => {
		reset(company as Company);
	}, [open, reset, company]);

	const onSubmit = (company: Company) => {
		if (!updateCompany) return;

		setLoading(true);
		toast
			.promise(updateCompany(company))
			.then(() => handleClose())
			.catch()
			.finally(() => setLoading(false));
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="lg" aria-labelledby="edit-company-dialog-title">
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<DialogTitle id="edit-company-dialog-title">Bearbeiten</DialogTitle>
				<DialogContent>
					<CompanyForm control={control} disabled={loading} />
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

export default EditCompanyDialog;
