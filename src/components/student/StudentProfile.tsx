import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styled from '@material-ui/core/styles/styled';
import StyledButton from 'components/StyledButton';
import { Student } from 'js-api-client';
import React from 'react';
import EditStudentDialog from './EditStudentDialog';
import GithubLanguagesBox from './profile/GithubLanguagesBox';
import GithubStatsBox from './profile/GithubStatsBox';
import StudentAbout from './profile/StudentAbout';
import StudentDescriptionBox from './profile/StudentDescriptionBox';
import StudentInfoBox from './profile/StudentInfoBox';
import StudentSkillsBox from './profile/StudentSkillsBox';

const Header = styled('div')`
	position: relative;
	width: 100%;
`;

const HeaderImg = styled('img')`
	object-fit: cover;
	object-position: center;
`;

const HeaderActions = styled('div')`
	position: absolute;
	right: ${(props) => props.theme.spacing(2)};
	bottom: ${(props) => props.theme.spacing(2)};
`;

export interface StudentProfileProps {
	student: Student;
	editable?: boolean;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student, editable }) => {
	const [editOpen, setEditOpen] = React.useState(false);

	const handleOpenEdit = () => {
		setEditOpen(true);
	};

	const handleCloseEdit = () => {
		setEditOpen(false);
	};

	const spacing = { xs: 2, md: 4 };

	return (
		<>
			<Header>
				<HeaderImg
					src={
						'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
					}
					alt="Header"
					width="100%"
					height="250px"
				/>
				{editable && (
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
			<EditStudentDialog open={editOpen} handleClose={handleCloseEdit} />
		</>
	);
};

export default StudentProfile;
