import { experimentalStyled as styled } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UndrawDeveloperActivity from 'assets/undraw_developer_activity.svg';
import UndrawMeetTheTeam from 'assets/undraw_meet_the_team.svg';
import RoundedBox from 'components/RoundedBox';
import React from 'react';
import { useHistory } from 'react-router';
import router from 'Router';

const OnboardingButton = styled(Button)`
	text-transform: none;
	color: inherit;
	height: 100%;

	& .MuiButton-label {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
`;

const Root = styled(Container)`
	display: flex;
	align-items: center;
	overflow-y: scroll;
	padding: ${(props) => props.theme.spacing(3)};
`;

const OnboardingPage: React.FC = () => {
	const history = useHistory();

	const handleStudent = () => history.push(router.onboarding().student().$);

	const handleCompany = () => history.push(router.onboarding().company().$);

	return (
		<Root maxWidth="lg">
			<RoundedBox padding={4}>
				<Grid container spacing={6}>
					<Grid item xs={12}>
						<Typography component="h1" variant="h4">
							Willkommen bei StudentNinja
						</Typography>
					</Grid>
					<Grid item sm xs={12}>
						<OnboardingButton onClick={handleStudent}>
							<Typography component="h3" variant="h5" gutterBottom>
								Student
							</Typography>
							<Typography component="p" variant="body1" gutterBottom textAlign="start">
								Einen Teilzeitjob finden um während dem Studium Geld zu verdienen und gleichzeitig
								Praxiserfahrung zu sammeln
							</Typography>
							<Box flexGrow={1} display="flex" justifyContent="center">
								<img src={UndrawDeveloperActivity} width="100%" alt="Als Student registrieren" />
							</Box>
						</OnboardingButton>
					</Grid>
					<Grid item sm xs={12}>
						<OnboardingButton onClick={handleCompany}>
							<Typography component="h3" variant="h5" gutterBottom>
								Unternehmen
							</Typography>
							<Typography component="p" variant="body1" gutterBottom textAlign="start">
								Bieten Sie Stellen für ambitionierte Studenten an und sichern Sie sich die Chance junge
								Talente früh in Ihr Unternehmen zu holen
							</Typography>
							<Box flexGrow={1} display="flex" justifyContent="center">
								<img src={UndrawMeetTheTeam} width="100%" alt="Als Unternehmen registrieren" />
							</Box>
						</OnboardingButton>
					</Grid>
				</Grid>
			</RoundedBox>
		</Root>
	);
};

export default OnboardingPage;
