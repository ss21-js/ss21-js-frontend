import React from 'react';
import Typography from '@material-ui/core/Typography';
import ProfileGithub from './profile/student/ProfileGithub';
import Center from '../components/layout/Center';
import { Student } from '../model/profile/student';
import { css } from '@emotion/react';

export interface StudentenProfilProps {
	student: Student;
}
const StudentenProfil: React.FC<StudentenProfilProps> = ({ student }) => {
	return (
		<Center>
			<>
				<Typography
					css={css`
						display: none;
					`}
				>
					{student.githubusername}
				</Typography>
			</>
			<>
				<ProfileGithub
					username={student.githubusername}
					languages={['Python', 'JavaScript', 'Flutter', 'TypeScript', 'Dart', 'Java']}
				/>
			</>
		</Center>
	);
};

export default StudentenProfil;
