import Autocomplete from '@material-ui/core/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import styled from '@material-ui/core/styles/styled';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DatePicker from '@material-ui/lab/DatePicker';
import { useMaterialRegister } from 'common/formUtils';
import { Student } from 'js-api-client';
import { omit } from 'lodash';
import langMap from 'models/langMap';
import programmingLanguages from 'models/programmingLanguages';
import WorkArea from 'models/workArea';
import WorkBasis from 'models/workBasis';
import React from 'react';
import { Control } from 'react-hook-form';

const Spacer = styled('div')`
	height: ${(props) => props.theme.spacing(3)};
`;

export interface StudentFormJobProps {
	control: Control<Student>;
	disabled: boolean;
}

const StudentFormJob: React.FC<StudentFormJobProps> = ({ control, disabled }) => {
	const workArea = useMaterialRegister(control, 'workArea');
	const workBasis = useMaterialRegister(control, 'workBasis');
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
						filterSelectedOptions
						disabled={disabled}
						renderInput={(params) => (
							<TextField {...params} label="Sprachen" placeholder="Sprachen auswählen" />
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
						filterSelectedOptions
						disabled={disabled}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Programmiersprachen"
								placeholder="Programmiersprachen auswählen"
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6">Verfügbarkeit</Typography>
				</Grid>
				<Grid item md={6} xs={12}>
					<DatePicker
						value={fromAvailable.value}
						label="Von"
						onChange={(newValue) => fromAvailable.onChange(newValue)}
						renderInput={(params) => <TextField {...params} fullWidth />}
					/>
				</Grid>
				<Grid item md={6} xs={12}>
					<DatePicker
						value={toAvailable.value}
						label="Bis"
						onChange={(newValue) => toAvailable.onChange(newValue)}
						renderInput={(params) => <TextField {...params} fullWidth />}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default StudentFormJob;
