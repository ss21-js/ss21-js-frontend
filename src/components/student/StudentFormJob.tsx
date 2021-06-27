import Autocomplete from '@material-ui/core/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import styled from '@material-ui/core/styles/styled';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMaterialRegister from 'common/useMaterialRegister';
import { Student } from 'js-api-client';
import { omit } from 'lodash';
import langMap from 'models/langMap';
import programmingLanguages from 'models/programmingLanguages';
import WorkArea from 'models/workArea';
import WorkBasis from 'models/workBasis';
import React from 'react';
import { Control } from 'react-hook-form';
import { DateRangePicker } from '@material-ui/lab';
import Box from '@material-ui/core/Box';

const Spacer = styled('div')`
	height: ${(props) => props.theme.spacing(3)};
`;

export interface StudentFormJobProps {
	control: Control<Student>;
	disabled: boolean;
}

const StudentFormJob: React.FC<StudentFormJobProps> = ({ control, disabled }) => {
	const workArea = useMaterialRegister(control, 'workArea');
	const workBasis = useMaterialRegister(control, 'workBasis', { transformer: 'number' });
	const languages = useMaterialRegister(control, 'languages');
	const skills = useMaterialRegister(control, 'skills');
	const fromAvailable = useMaterialRegister(control, 'fromAvailable', { includeValue: true });
	const toAvailable = useMaterialRegister(control, 'toAvailable', { includeValue: true });

	return (
		<>
			<Typography variant="h5">Jobpräferenzen</Typography>
			<Spacer />
			<Grid container spacing={4}>
				<Grid item md={6} xs={12}>
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
				<Grid item md={6} xs={12}>
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
					<Autocomplete
						multiple
						id="languages"
						onChange={(_, data) => languages.onChange(data)}
						options={langMap}
						getOptionLabel={(option) => option}
						defaultValue={languages.defaultValue}
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
				<Grid item xs={12}>
					<Autocomplete
						multiple
						id="skills"
						onChange={(_, data) => skills.onChange(data)}
						options={programmingLanguages}
						getOptionLabel={(option) => option}
						defaultValue={skills.defaultValue}
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
				<Grid item xs={12}>
					<Typography variant="h6">Verfügbarkeit</Typography>
				</Grid>
				<Grid item xs={12}>
					<DateRangePicker
						startText="Von"
						endText="Bis"
						mask="__.__.____"
						value={[fromAvailable.value, toAvailable.value]}
						onChange={(newValue) => {
							fromAvailable.onChange(newValue[0]);
							toAvailable.onChange(newValue[1]);
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
		</>
	);
};

export default StudentFormJob;
