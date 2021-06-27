import Stack from '@material-ui/core/Stack';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import { Student } from 'js-api-client';
import React from 'react';

export interface StudentAboutProps {
	student: Student;
}

const StudentAbout: React.FC<StudentAboutProps> = ({ student }) => {
	const theme = useTheme();

	return (
		<>
			<Typography variant="h4" component="h3" flexGrow={1}>
				{student.firstName} {student.lastName}
			</Typography>
			<Stack direction="row" alignItems="baseline" marginBottom={3} flexWrap="wrap">
				<Typography variant="h6" color={theme.palette.primary.main}>
					Student*in
				</Typography>
				<Typography variant="body1" marginX={1}>
					•
				</Typography>
				<Typography variant="body1">
					{student.address.city}, {student.address.state} {student.address.country}
				</Typography>
			</Stack>
		</>
	);
};

export default StudentAbout;
