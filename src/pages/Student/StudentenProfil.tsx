import React from 'react';
import Typography from '@material-ui/core/Typography';
import ProfileGithub from './ProfileGithub';
import Center from '../../components/layout/Center';
import { Student } from '../../model/profile/student';
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
					languages={[
						{ name: 'Python', count: 12 },
						{ name: 'JavaScript', count: 19 },
						{ name: 'Flutter', count: 3 },
						{ name: 'TypeScript', count: 5 },
						{ name: 'Dart', count: 2 },
						{ name: 'Java', count: 3 },
					]}
				/>
			</>
		</Center>
	);
};

export default StudentenProfil;
