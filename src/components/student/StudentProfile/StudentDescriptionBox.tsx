import Typography from '@material-ui/core/Typography';
import RoundedBox from 'components/RoundedBox';
import { Student } from 'js-api-client';
import React from 'react';

export interface StudentDescriptionBoxProps {
	student: Student;
}

const StudentDescriptionBox: React.FC<StudentDescriptionBoxProps> = ({ student }) => {
	return (
		<RoundedBox padding={3}>
			<Typography variant="h5" component="h4" gutterBottom>
				Beschreibung
			</Typography>
			<Typography>{student.description}</Typography>
		</RoundedBox>
	);
};

export default StudentDescriptionBox;
