import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import styled from '@material-ui/core/styles/styled';
import Typography from '@material-ui/core/Typography';
import UndrawDeveloperActivity from 'assets/undraw_developer_activity.svg';
import UndrawMeetTheTeam from 'assets/undraw_meet_the_team.svg';
import Scrollable from 'components/app/Scrollable';
import CenterContainer from 'components/layout/CenterContainer';
import RoundedBox from 'components/RoundedBox';
import StyledButton from 'components/StyledButton';
import React from 'react';
import { useHistory } from 'react-router';
import router from 'Router';
import signOut from 'store/auth/signOut';

const OnboardingButton = styled(Button)`
	text-transform: none;
	color: inherit;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: ${(props) => props.theme.spacing(2)};
`;
const OnboardingPage: React.FC = () => {
	const history = useHistory();

	const handleStudent = () => history.push(router.onboarding().student().$);

	const handleCompany = () => history.push(router.onboarding().company().$);

	return (
		<Scrollable>
			<CenterContainer maxWidth="lg">
				<RoundedBox padding={4}>
					<Grid container spacing={6}>
						<Grid item xs={12} display="flex">
							<Typography flexGrow={1} component="h1" variant="h4">
								Willkommen bei StudentNinja
							</Typography>
							<StyledButton onClick={signOut}>Ausloggen</StyledButton>
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
									Bieten Sie Stellen für ambitionierte Studenten an und sichern Sie sich die Chance
									junge Talente früh in Ihr Unternehmen zu holen
								</Typography>
								<Box flexGrow={1} display="flex" justifyContent="center">
									<img src={UndrawMeetTheTeam} width="100%" alt="Als Unternehmen registrieren" />
								</Box>
							</OnboardingButton>
						</Grid>
					</Grid>
				</RoundedBox>
			</CenterContainer>
		</Scrollable>
	);
};

export default OnboardingPage;
