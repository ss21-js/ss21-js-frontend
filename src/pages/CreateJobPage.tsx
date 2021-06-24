import { joiResolver } from '@hookform/resolvers/joi';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useMaterialRegister } from 'common/formUtils';
import AppFrame from 'components/app/AppFrame';
import Scrollable from 'components/app/Scrollable';
import CenterContainer from 'components/layout/CenterContainer';
import RoundedBox from 'components/RoundedBox';
import StyledButton from 'components/StyledButton';
import { CreateJobDto } from 'js-api-client';
import { createJobDtoSchema } from 'models/joiSchemas';
import React from 'react';
import { useForm } from 'react-hook-form';

const CreateJobPage: React.FC = () => {
	const [loading, setLoading] = React.useState(false);

	const { control, handleSubmit } = useForm<CreateJobDto>({
		resolver: joiResolver(createJobDtoSchema),
		mode: 'all',
	});

	const name = useMaterialRegister(control, 'jobName');
	const description = useMaterialRegister(control, 'jobDescription');

	const onSubmit = (data: CreateJobDto) => {
		console.log(data);
	};

	return (
		<AppFrame>
			<Scrollable>
				<CenterContainer maxWidth="sm">
					<RoundedBox padding={3}>
						<form onSubmit={handleSubmit(onSubmit)} noValidate>
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
										label="Jobtitel"
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
								<StyledButton
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									loading={loading}
								>
									Erstellen
								</StyledButton>
							</Grid>
						</form>
					</RoundedBox>
				</CenterContainer>
			</Scrollable>
		</AppFrame>
	);
};

export default CreateJobPage;
