import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styled from '@material-ui/core/styles/styled';
import AboutMeSection from 'components/student/profile/AboutMeSection';
import GithubSection from 'components/student/profile/GithubSection';
import StyledButton from 'components/StyledButton';
import { Student } from 'js-api-client';
import React from 'react';

const Header = styled('div')`
	position: relative;
	width: 100%;
	color: white;
`;
const HeaderImageContainer = styled('div')`
	border-radius: ${(props) => props.theme.shape.borderRadius};
	background-color: ${(props) => props.theme.palette.background.paper};
`;

const HeaderImg = styled('img')`
	border-top-left-radius: inherit;
	border-top-right-radius: inherit;
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

	return (
		<>
			<Header>
				<HeaderImageContainer>
					<HeaderImg
						src={
							'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
						}
						alt="Header"
						width="100%"
						height="250px"
					/>
				</HeaderImageContainer>
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
					spacing={2}
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
			</Container>
		</>
	);
};

export default StudentProfile;
