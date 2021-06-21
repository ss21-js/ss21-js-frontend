import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import styled from '@material-ui/core/styles/styled';
import RoundedBox from 'components/RoundedBox';
import StyledButton from 'components/StyledButton';
import React from 'react';
import Center from '../layout/Center';

const Root = styled(Box)`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const StepWrapper = styled(RoundedBox)`
	margin-top: ${(props) => props.theme.spacing(3)};
`;

const ButtonWrapper = styled('div')`
	display: flex;
	margin-top: ${(props) => props.theme.spacing(2)};
	justify-content: flex-end;
`;

const ButtonSpacer = styled('div')`
	width: ${(props) => props.theme.spacing(2)};
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

export interface StepContent {
	label: string;
	component: React.ReactNode;
}

export interface StepperContainerProps {
	steps: StepContent[];
	next: (from: number, to: number) => Promise<boolean>;
}

const StepperContainer: React.FC<StepperContainerProps> = ({ steps, next }) => {
	const [loading, setLoading] = React.useState(false);
	const [activeStep, setActiveStep] = React.useState(2);

	const handleNext = async () => {
		setLoading(true);
		if (await next(activeStep, activeStep + 1)) {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
		setLoading(false);
	};

	const handleBack = async () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<Root>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((step) => (
					<Step key={step.label}>
						<StepLabel>{step.label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<StepWrapper padding={4}>
				{activeStep === steps.length ? (
					<>
						<CenterContainer>
							Erfolgreich registriert! <Icon icon={faCheck} size="lg" color="primary" />
						</CenterContainer>
						<ButtonContainer onClick={handleReset}>Zurücksetzen</ButtonContainer>
					</>
				) : (
					<>
						{steps[activeStep].component}
						<ButtonWrapper>
							{activeStep !== 0 && (
								<>
									<StyledButton variant="text" onClick={handleBack} disabled={loading}>
										Zurück
									</StyledButton>
									<ButtonSpacer />
								</>
							)}
							<StyledButton onClick={handleNext} loading={loading}>
								{activeStep === steps.length - 1 ? 'Abschließen' : 'Nächster Schritt'}
							</StyledButton>
						</ButtonWrapper>
					</>
				)}
			</StepWrapper>
		</Root>
	);
};

export default StepperContainer;
