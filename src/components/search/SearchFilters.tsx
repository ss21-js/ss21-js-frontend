import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from '@material-ui/core/styles/styled';
import RoundedBox from 'components/RoundedBox';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import WorkArea from 'models/workArea';
import WorkBasis from 'models/workBasis';
import { DateRangePicker } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/core/Autocomplete';
import langMap from 'models/langMap';
import programmingLanguages from 'models/programmingLanguages';
import { Control } from 'react-hook-form';
import { SearchJobDto } from 'js-api-client';
import { omit } from 'lodash';
import FormHelperText from '@material-ui/core/FormHelperText';
import useMaterialRegister from 'common/useMaterialRegister';
import StyledButton from 'components/StyledButton';

export interface SearchFiltersProps {
	control: Control<SearchJobDto>;
	isDirty: boolean;
}

const FilterBox = styled(RoundedBox)`
	position: sticky;
	top: 0;
	padding: ${(props) => props.theme.spacing(3)};
`;

const SearchFilters: React.FC<SearchFiltersProps> = ({ control, isDirty }) => {
	const languages = useMaterialRegister(control, 'languages', { includeValue: true });
	const skills = useMaterialRegister(control, 'skills', { includeValue: true });
	const workArea = useMaterialRegister(control, 'workArea', { includeValue: true });
	const workBasis = useMaterialRegister(control, 'workBasis', { includeValue: true });
	const from = useMaterialRegister(control, 'from', { includeValue: true });
	const to = useMaterialRegister(control, 'to', { includeValue: true });

	return (
		<FilterBox>
			<Typography variant="h6">Filter</Typography>
			<Grid container spacing={2} marginTop={1}>
				<Grid item xs={12} marginBottom={2}>
					<Autocomplete
						multiple
						id="languages"
						value={languages.value}
						onChange={(_, data) => languages.onChange(data)}
						options={langMap}
						getOptionLabel={(option) => option}
						filterSelectedOptions
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

				<Grid item xs={12} marginBottom={2}>
					<FormControl fullWidth>
						<InputLabel htmlFor="workArea">Bereich</InputLabel>
						<Select {...omit(workArea, 'helperText', 'defaultValue')} id="workArea" label="Bereich" native>
							<option value={WorkArea.NONE}>Keine Präferenz</option>
							<option value={WorkArea.FRONTEND}>Frontend</option>
							<option value={WorkArea.BACKEND}>Backend</option>
							<option value={WorkArea.FULLSTACK}>Fullstack</option>
						</Select>
						{workArea.helperText && <FormHelperText>{workArea.helperText}</FormHelperText>}
					</FormControl>
				</Grid>
				<Grid item xs={12} marginBottom={2}>
					<FormControl fullWidth>
						<InputLabel htmlFor="workBasis">Anstellungsart</InputLabel>
						<Select
							{...omit(workBasis, 'helperText', 'defaultValue')}
							id="workBasis"
							variant="outlined"
							label="Anstellungsart"
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
					<Typography variant="h6">Verfügbarkeit</Typography>
				</Grid>
				<Grid item xs={12}>
					<DateRangePicker
						startText="Von"
						endText="Bis"
						mask="__.__.____"
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
				<Grid item xs={12}>
					<StyledButton fullWidth disabled={!isDirty} type={'submit'}>
						Anwenden
					</StyledButton>
				</Grid>
			</Grid>
		</FilterBox>
	);
};

export default SearchFilters;
