import styled from '@emotion/styled';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Center from '../layout/Center';
import RoundedBox from '../RoundedBox';

const Wrapper = styled.div`
	margin-top: 50px;
`;

const ButtonWrapper = styled.div`
	margin-top: 50px;
`;

const ButtonContainer = styled(Button)`
	margin-top: 50px;
`;

const Box = styled(RoundedBox)`
	height: 300px;
	width: 800px;
`;

const Icon = styled(FontAwesomeIcon)`
	margin-left: 10px;
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
	const steps = getSteps(['Profil Informationen', 'Extra Informationen', 'Bild']);

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
		<div>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<Wrapper>
						<Box>
							<Center>
								Erfolgreich registriert! <Icon icon={faCheck} size="lg" color="primary" />{' '}
							</Center>
						</Box>

						<ButtonContainer onClick={handleReset}>Zurücksetzen</ButtonContainer>
					</Wrapper>
				) : (
					<Wrapper>
						<Typography>
							{getStepContent(
								activeStep
								//TODO: This is where the respective classes of the pages go
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
