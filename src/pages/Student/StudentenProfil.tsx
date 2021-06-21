import { css } from '@emotion/react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AboutMeSection from 'components/profile/AboutMeSection';
import GithubSection from 'components/profile/GithubSection';
import ProfileHeaderSection from 'components/profile/ProfileHeaderSection';
import { Student } from 'js-api-client';
import React from 'react';

export interface StudentenProfilProps {
	student: Student;
}

const StudentenProfil: React.FC<StudentenProfilProps> = ({ student }) => {
	return (
		<Box marginTop={4}>
			<ProfileHeaderSection />
			<Grid
				container
				css={css`
					margin-left: auto;
					margin-right: auto;
					max-width: 1280px;
					padding-left: 24px;
					padding-right: 24px;
				`}
			>
				<Grid item lg={8} md={9} sm={8} xs={12}>
					<AboutMeSection student={student} />
				</Grid>
				<Grid item lg={4} md={3} sm={4} xs={12}>
					<GithubSection
						username={student.githubUrl}
						languages={[
							{ name: 'Python', count: 12 },
							{ name: 'JavaScript', count: 19 },
							{ name: 'Flutter', count: 3 },
							{ name: 'TypeScript', count: 5 },
							{ name: 'Dart', count: 2 },
							{ name: 'Java', count: 3 },
						]}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default StudentenProfil;
