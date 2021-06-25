import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styled from '@material-ui/core/styles/styled';
import ProfileImages from 'components/profile/ProfileHeaderImages';
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
	// const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const [editOpen, setEditOpen] = React.useState(false);

	// const toast = useToast();
	// const updateStudent = useUpdateStudent();

	// const uploadFileAndUpdateUrl = async (file: File, key: keyof Student) => {
	// 	const refString = `images/${student.id}/${file.name}`;
	// 	const fileRef = ref(firebaseStorage, refString);
	// 	await uploadBytes(fileRef, file);
	// 	return updateStudent!({ ...student, [key]: refString });
	// };

	const headerImageChanged = (file: File) => {
		// toast.promise(uploadFileAndUpdateUrl(file, 'studentHeaderImageUrl'));
		console.log(file);
	};

	const profileImageChanged = (file: File) => {
		// toast.promise(uploadFileAndUpdateUrl(file, 'studentProfileImageUrl'));
		console.log(file);
	};

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
				<ProfileImages
					// headerImageUrl={student.companyHeaderImageUrl}
					headerImageChanged={headerImageChanged}
					// profileImageUrl={student.companyProfileImageUrl}
					profileImageChanged={profileImageChanged}
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
