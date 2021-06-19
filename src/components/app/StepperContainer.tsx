import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import AdditionalDataCompany from 'src/pages/Company/AdditionalDataCompany';
import ProfileInformtion from 'src/pages/Company/ProfileInformtion';
import Center from '../layout/Center';
import ProfileImageUpload from './ProfileImageUpload';
import { css } from '@emotion/react';

//const mobileBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

const StepperWrapper = styled(Stepper)`
	padding-top: 3rem;
	background-color: white;
`;

const Wrapper = styled('div')`
	padding-top: 3rem;
	background-color: white;
`;

const ButtonWrapper = styled('div')`
	padding-top: 3rem;
	padding-bottom: 3rem;
	padding-left: 11rem;
`;

const ButtonContainer = styled(Button)`
	margin-bottom: 3rem;
	margin-left: 11rem;
`;

const Icon = styled(FontAwesomeIcon)`
	margin-left: 10px;
`;

const CenterContainer = styled(Center)`
	height: 30rem;
`;

function getSteps(steps: string[]) {
	return steps;
}

//In order to use this for students, one can intercept the switch case with an if-query
function getStepContent(
	stepIndex: number,
	stepOne?: React.ReactNode,
	stepTwo?: React.ReactNode,
	stepThree?: React.ReactNode
) {
	switch (stepIndex) {
		case 0:
			return stepOne;
		case 1:
			return stepTwo;
		case 2:
			return stepThree;
		default:
			return 'Kein gültiger Schrittindex';
	}
}

const StepperContainer: React.FC = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps(['Profil Daten', 'zusätzliche Daten', 'Profilbild']);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<div
			css={css`
				margin-left: auto;
				margin-right: auto;
				max-width: 1280px;
				padding-left: 24px;
				padding-right: 24px;
			`}
		>
			<StepperWrapper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</StepperWrapper>
			<div>
				{activeStep === steps.length ? (
					<Wrapper>
						<CenterContainer>
							Erfolgreich registriert! <Icon icon={faCheck} size="lg" color="primary" />
						</CenterContainer>
						<ButtonContainer onClick={handleReset}>Zurücksetzen</ButtonContainer>
					</Wrapper>
				) : (
					<Wrapper>
						<Typography>
							{getStepContent(
								activeStep,
								//TODO: This is where the respective classes of the pages go
								<ProfileInformtion />,
								<AdditionalDataCompany />,
								<ProfileImageUpload />
							)}
						</Typography>
						<ButtonWrapper>
							<Button disabled={activeStep === 0} onClick={handleBack}>
								Zurück
							</Button>
							<Button variant="contained" color="primary" onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Abgeschlossen' : 'Nächster Schritt'}
							</Button>
						</ButtonWrapper>
					</Wrapper>
				)}
			</div>
		</div>
	);
};

export default StepperContainer;
