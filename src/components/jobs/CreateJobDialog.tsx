import { joiResolver } from '@hookform/resolvers/joi';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useMaterialRegister } from 'common/formUtils';
import StyledButton from 'components/StyledButton';
import Joi from 'joi';
import { CreateJobDto } from 'js-api-client';
import React from 'react';
import { useForm } from 'react-hook-form';

const createJobDtoSchema = Joi.object<CreateJobDto>({
	jobName: Joi.string().min(10).max(50).required(),
	jobDescription: Joi.string().min(30).required(),
});

export interface CreateJobDialogProps {
	open: boolean;
	handleClose: () => boolean;
}

const CreateJobDialog: React.FC<CreateJobDialogProps> = ({ open, handleClose }) => {
	const [loading, setLoading] = React.useState(false);

	const { control, handleSubmit, register, formState } = useForm<CreateJobDto>({
		resolver: joiResolver(createJobDtoSchema),
	});

	const name = useMaterialRegister(control, 'jobName');
	const description = useMaterialRegister(control, 'jobDescription');

	const onSubmit = (data: CreateJobDto) => {
		console.log(data);
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="create-job-dialog-title">
			<DialogTitle id="create-job-dialog-title">Neuen Job anlegen</DialogTitle>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<DialogContent>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography component="h1" variant="h4">
								Neuen Job anlegen
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...name}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Titel"
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...description}
								variant="outlined"
								margin="normal"
								required
								multiline
								rows={4}
								fullWidth
								label="Beschreibung"
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={12}></Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<StyledButton onClick={handleClose}>Abbrechen</StyledButton>
					<StyledButton type="submit" fullWidth variant="contained" color="primary" loading={loading}>
						Erstellen
					</StyledButton>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default CreateJobDialog;
