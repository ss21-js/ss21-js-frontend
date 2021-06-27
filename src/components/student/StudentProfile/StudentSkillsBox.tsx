import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { stringToHslColor } from 'common/utils';
import RoundedBox from 'components/RoundedBox';
import TagBox from 'components/TagBox';
import { Student } from 'js-api-client';
import React from 'react';

export interface StudentSkillsBoxProps {
	student: Student;
}

const StudentSkillsBox: React.FC<StudentSkillsBoxProps> = ({ student }) => {
	if (
		(student.languages === null || student.languages.length === 0) &&
		(student.skills === null || student.skills.length === 0)
	) {
		return <></>;
	}

	return (
		<RoundedBox padding={3}>
			<Typography variant="h6">Sprachen & Skills</Typography>
			<Box marginTop={2}>
				<Grid container spacing={2} marginBottom={2} justifyContent={'space-evenly'}>
					{[...student.languages, ...student.skills].map((skill) => (
						<Grid key={skill} item>
							<TagBox content={skill} color={stringToHslColor(skill)} />
						</Grid>
					))}
				</Grid>
			</Box>
		</RoundedBox>
	);
};

export default StudentSkillsBox;
