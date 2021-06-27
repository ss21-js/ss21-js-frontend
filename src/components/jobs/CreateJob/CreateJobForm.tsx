import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
import langMap from 'models/langMap';
import programmingLanguages from 'models/programmingLanguages';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { omit } from 'lodash';
import WorkArea from 'models/workArea';
import FormHelperText from '@material-ui/core/FormHelperText';
import WorkBasis from 'models/workBasis';
import { DateRangePicker } from '@material-ui/lab';
import React, { FormEventHandler } from 'react';
import Box from '@material-ui/core/Box';
import StyledButton from 'components/StyledButton';
import RoundedBox from 'components/RoundedBox';
import useMaterialRegister from 'common/useMaterialRegister';
import { Control } from 'react-hook-form';
import { CreateJobDto } from 'js-api-client';

interface CreateJobFormProps {
	control: Control<CreateJobDto>;
	disabled: boolean;
	handleSubmit: FormEventHandler;
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({ control, disabled, handleSubmit }) => {
	const name = useMaterialRegister(control, 'jobName', { includeValue: true });
	const description = useMaterialRegister(control, 'jobDescription', { includeValue: true });
	const qualifications = useMaterialRegister(control, 'jobQualifications', { includeValue: true });
	const languages = useMaterialRegister(control, 'languages', { includeValue: true });
	const skills = useMaterialRegister(control, 'skills', { includeValue: true });
	const workArea = useMaterialRegister(control, 'workArea', { includeValue: true });
	const workBasis = useMaterialRegister(control, 'workBasis', { includeValue: true });
	const from = useMaterialRegister(control, 'from', { includeValue: true });
	const to = useMaterialRegister(control, 'to', { includeValue: true });

	return (
		<RoundedBox padding={3}>
			<form onSubmit={handleSubmit} noValidate>
				<Typography component="h1" variant="h4">
					Neuen Job anlegen
				</Typography>
				<Grid
					container
					paddingY={2}
					spacing={{
						md: 4,
						sm: 2,
					}}
				>
					<Grid item md={6} xs={12}>
						<Grid container>
							<Grid item xs={12}>
								<TextField
									{...name}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									label="Jobtitel"
									disabled={disabled}
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
									disabled={disabled}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									value={qualifications.value?.join('\n') ?? ''}
									onChange={(e) =>
										qualifications.onChange({
											target: { value: e.target.value.split('\n') },
										})
									}
									error={qualifications.error}
									variant="outlined"
									margin="normal"
									required
									multiline
									rows={4}
									fullWidth
									label="Qualifikationen"
									placeholder={`- Bachelorstudium Informatik oder Wirtschaftsinformatik mindestens im 4. Semester
- Teamfähig
													`}
									helperText={
										qualifications.error
											? qualifications.helperText
											: 'Stichpunkte mit "-" am Zeilenanfang'
									}
									disabled={disabled}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item md={6} xs={12} marginTop={2}>
						<Grid
							container
							spacing={{
								md: 4,
								sm: 2,
							}}
						>
							<Grid item xs={12} marginBottom={2}>
								<Autocomplete
									multiple
									id="languages"
									value={languages.value}
									onChange={(_, data) => languages.onChange(data)}
									options={langMap}
									getOptionLabel={(option) => option}
									filterSelectedOptions
									disabled={disabled}
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
							<Grid item xs={12} marginBottom={2}>
								<Autocomplete
									multiple
									id="skills"
									value={skills.value}
									onChange={(_, data) => skills.onChange(data)}
									options={programmingLanguages}
									getOptionLabel={(option) => option}
									filterSelectedOptions
									disabled={disabled}
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

							<Grid item md={6} xs={12} marginBottom={2}>
								<FormControl fullWidth>
									<InputLabel htmlFor="workArea">Bereich</InputLabel>
									<Select
										{...omit(workArea, 'helperText')}
										id="workArea"
										label="Bereich"
										disabled={disabled}
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
							<Grid item md={6} xs={12} marginBottom={2}>
								<FormControl fullWidth>
									<InputLabel htmlFor="workBasis">Anstellungsart</InputLabel>
									<Select
										{...omit(workBasis, 'helperText')}
										id="workBasis"
										variant="outlined"
										label="Anstellungsart"
										disabled={disabled}
										native
									>
										<option value={WorkBasis.NONE}>Keine Präferenz</option>
										<option value={WorkBasis.PART_TIME}>Teilzeit</option>
										<option value={WorkBasis.FULL_TIME}>Vollzeit</option>
									</Select>
									{workBasis.helperText && <FormHelperText>{workBasis.helperText}</FormHelperText>}
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<DateRangePicker
									startText="Von"
									endText="Bis"
									mask="__.__.____"
									minDate={new Date()}
									value={[from.value, to.value]}
									onChange={(newValue) => {
										from.onChange(newValue[0]);
										to.onChange(newValue[1]);
									}}
									renderInput={(startProps, endProps) => (
										<React.Fragment>
											<TextField {...startProps} fullWidth />
											<Box sx={{ mx: 2 }}> bis </Box>
											<TextField {...endProps} fullWidth />
										</React.Fragment>
									)}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<StyledButton type="submit" variant="contained" color="primary" disabled={disabled}>
					Erstellen
				</StyledButton>
			</form>
		</RoundedBox>
	);
};

export default CreateJobForm;
