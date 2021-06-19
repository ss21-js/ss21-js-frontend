import { joiResolver } from '@hookform/resolvers/joi';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import StyledButton from 'components/StyledButton';
import { Company } from 'js-api-client';
import { companySchema } from 'models/joiSchemas';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { currentUserAtom, useUpdateCompany } from 'store/user';
import CompanyForm from './CompanyForm';

export interface EditCompanyDialogProps {
	open: boolean;
	handleClose: () => void;
}

const EditCompanyDialog: React.FC<EditCompanyDialogProps> = ({ open, handleClose }) => {
	const [loading, setLoading] = React.useState(false);
	const [company, setCompany] = useRecoilState(currentUserAtom);

	const updateCompany = useUpdateCompany();

	const { control, handleSubmit, reset } = useForm<Company>({
		resolver: joiResolver(companySchema),
		defaultValues: company as Company,
	});

	React.useEffect(() => {
		reset(company as Company);
	}, [open, reset, company]);

	const onSubmit = (company: Company) => {
		if (!updateCompany) return;

		setLoading(true);

		updateCompany(company)
			.then((newCompany) => {
				// TODO: Show notification
				setCompany(newCompany);
				setLoading(false);
			})
			.catch((e) => {
				console.error(e);
				setLoading(false);
			});
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
					<StyledButton type="submit" color="primary" disabled={loading}>
						Speichern
					</StyledButton>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default EditCompanyDialog;
