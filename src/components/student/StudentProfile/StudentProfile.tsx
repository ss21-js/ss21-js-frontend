import ProfileImages from 'components/profile/ProfileHeaderImages';
import StyledButton from 'components/StyledButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Student } from 'js-api-client';
import styled from '@material-ui/core/styles/styled';
import GithubStatsBox from 'components/student/StudentProfile/GithubStatsBox';
import StudentInfoBox from 'components/student/StudentProfile/StudentInfoBox';
import StudentAbout from 'components/student/StudentProfile/StudentAbout';
import StudentDescriptionBox from 'components/student/StudentProfile/StudentDescriptionBox';
import StudentSkillsBox from 'components/student/StudentProfile/StudentSkillsBox';
import GithubLanguagesBox from 'components/student/StudentProfile/GithubLanguagesBox';

const Header = styled('div')`
	position: relative;
	width: 100%;
	color: white;
`;

const HeaderActions = styled('div')`
	position: absolute;
	right: ${(props) => props.theme.spacing(2)};
	bottom: ${(props) => props.theme.spacing(2)};
`;

interface StudentProfileProps {
	student: Student;
	handleOpenEdit?: () => void;
	headerImageChanged?: (file: File, url: string) => void;
	profileImageChanged?: (file: File, url: string) => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({
	student,
	headerImageChanged,
	profileImageChanged,
	handleOpenEdit,
}) => {
	const spacing = { xs: 2, md: 4 };

	return (
		<>
			<Header>
				<ProfileImages
					headerImageUrl={student.headerImageUrl}
					headerImageChanged={headerImageChanged}
					profileImageUrl={student.profileImageUrl}
					profileImageChanged={profileImageChanged}
				/>
				{handleOpenEdit && (
					<HeaderActions>
						<StyledButton onClick={handleOpenEdit}>Profil bearbeiten</StyledButton>
					</HeaderActions>
				)}
			</Header>
			<Container maxWidth="lg">
				<Grid
					container
					padding={{
						xs: 2,
						md: 4,
					}}
					spacing={spacing}
				>
					<Grid item xs={12}>
						<StudentAbout student={student} />
					</Grid>
					<Grid item lg={8} md={7} sm={6} xs={12}>
						<Grid container spacing={spacing}>
							<Grid item xs={12}>
								<StudentInfoBox student={student} />
							</Grid>
							<Grid item xs={12}>
								<StudentDescriptionBox student={student} />
							</Grid>
							<Grid item xs={12}>
								<StudentSkillsBox student={student} />
							</Grid>
						</Grid>
					</Grid>
					<Grid item lg={4} md={5} sm={6} xs={12}>
						<Grid container spacing={spacing}>
							<Grid item xs={12}>
								<GithubLanguagesBox
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
							{student.githubUrl && (
								<Grid item xs={12}>
									<GithubStatsBox username={student.githubUrl} />
								</Grid>
							)}
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};
export default StudentProfile;
