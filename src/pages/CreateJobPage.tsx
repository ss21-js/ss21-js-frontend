import { joiResolver } from '@hookform/resolvers/joi';
import Autocomplete from '@material-ui/core/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DatePicker from '@material-ui/lab/DatePicker';
import { useMaterialRegister } from 'common/formUtils';
import useToast from 'common/useToast';
import AppFrame from 'components/app/AppFrame';
import Scrollable from 'components/app/Scrollable';
import CenterContainer from 'components/layout/CenterContainer';
import RoundedBox from 'components/RoundedBox';
import StyledButton from 'components/StyledButton';
import { add } from 'date-fns/esm';
import { Company, CreateJobDto } from 'js-api-client';
import { omit } from 'lodash';
import { createJobDtoSchema } from 'models/joiSchemas';
import langMap from 'models/langMap';
import programmingLanguages from 'models/programmingLanguages';
import WorkArea from 'models/workArea';
import WorkBasis from 'models/workBasis';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import useCreateJob from 'store/jobs/useCreateJob';
import currentUserState from 'store/user/currentUserState';

const CreateJobPage: React.FC = () => {
	const [loading, setLoading] = React.useState(false);
	const company = useRecoilValue(currentUserState) as Company;

	const toast = useToast();
	const createJob = useCreateJob();

	const { control, handleSubmit } = useForm<CreateJobDto>({
		resolver: joiResolver(createJobDtoSchema),
		defaultValues: {
			contactMail: company.email,
			from: new Date(),
			to: add(new Date(), { months: 1 }),
			workArea: WorkArea.NONE.valueOf(),
			workBasis: WorkBasis.NONE.valueOf(),
		},
	});

	const name = useMaterialRegister(control, 'jobName');
	const description = useMaterialRegister(control, 'jobDescription');
	const languages = useMaterialRegister(control, 'languages');
	const skills = useMaterialRegister(control, 'skills');
	const workArea = useMaterialRegister(control, 'workArea');
	const workBasis = useMaterialRegister(control, 'workBasis');
	const from = useMaterialRegister(control, 'from', { includeValue: true });
	const to = useMaterialRegister(control, 'to', { includeValue: true });

	const onSubmit = (data: CreateJobDto) => {
		setLoading(true);
		toast
			.promise(createJob!(data))
			.catch()
			.finally(() => setLoading(false));
	};

	return (
		<AppFrame>
			<Scrollable>
				<CenterContainer maxWidth="md">
					<RoundedBox padding={3}>
						<form onSubmit={handleSubmit(onSubmit)} noValidate>
							<Grid
								container
								spacing={{
									md: 4,
									sm: 2,
								}}
							>
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
								<Grid item md={6} xs={12} marginBottom={2}>
									<Autocomplete
										multiple
										id="languages"
										onChange={(_, data) => languages.onChange(data)}
										options={langMap}
										getOptionLabel={(option) => option}
										filterSelectedOptions
										disabled={loading}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Sprachen"
												placeholder="Sprachen auswählen"
												error={languages.error}
												helperText={languages.helperText}
											/>
										)}
									/>
								</Grid>
								<Grid item md={6} xs={12} marginBottom={2}>
									<Autocomplete
										multiple
										id="skills"
										onChange={(_, data) => skills.onChange(data)}
										options={programmingLanguages}
										getOptionLabel={(option) => option}
										filterSelectedOptions
										disabled={loading}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Programmiersprachen"
												placeholder="Programmiersprachen auswählen"
												error={skills.error}
												helperText={skills.helperText}
											/>
										)}
									/>
								</Grid>

								<Grid item md={6} xs={12}>
									<FormControl fullWidth>
										<InputLabel htmlFor="workArea">Bereich</InputLabel>
										<Select
											{...omit(workArea, 'helperText')}
											id="workArea"
											label="Bereich"
											disabled={loading}
											native
										>
											<option value={WorkArea.NONE}>Keine Präferenz</option>
											<option value={WorkArea.FRONTEND}>Frontend</option>
											<option value={WorkArea.BACKEND}>Backend</option>
											<option value={WorkArea.FULLSTACK}>Fullstack</option>
										</Select>
										{workArea.helperText && <FormHelperText>{workArea.helperText}</FormHelperText>}
									</FormControl>
								</Grid>
								<Grid item md={6} xs={12}>
									<FormControl fullWidth>
										<InputLabel htmlFor="workBasis">Anstellungsart</InputLabel>
										<Select
											{...omit(workBasis, 'helperText')}
											id="workBasis"
											variant="outlined"
											label="Anstellungsart"
											disabled={loading}
											native
										>
											<option value={WorkBasis.NONE}>Keine Präferenz</option>
											<option value={WorkBasis.PART_TIME}>Teilzeit</option>
											<option value={WorkBasis.FULL_TIME}>Vollzeit</option>
										</Select>
										{workBasis.helperText && (
											<FormHelperText>{workBasis.helperText}</FormHelperText>
										)}
									</FormControl>
								</Grid>
								<Grid item xs={12} marginTop={2} marginBottom={1}>
									<Typography variant="h6">Zeitraum</Typography>
								</Grid>
								<Grid item md={6} xs={12}>
									<DatePicker
										value={from.value}
										label="Von"
										onChange={(newValue) => from.onChange(newValue)}
										mask="__.__.____"
										renderInput={(params) => <TextField {...params} fullWidth />}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<DatePicker
										value={to.value}
										label="Bis"
										onChange={(newValue) => to.onChange(newValue)}
										mask="__.__.____"
										renderInput={(params) => <TextField {...params} fullWidth />}
									/>
								</Grid>
								<Grid item xs={12} marginTop={2} display="flex" justifyContent="center">
									<StyledButton type="submit" variant="contained" color="primary" loading={loading}>
										Erstellen
									</StyledButton>
								</Grid>
							</Grid>
						</form>
					</RoundedBox>
				</CenterContainer>
			</Scrollable>
		</AppFrame>
	);
};

export default CreateJobPage;
