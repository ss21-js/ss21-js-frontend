import { Theme, useMediaQuery } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MobileStepper from '@material-ui/core/MobileStepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import styled from '@material-ui/core/styles/styled';
import CenterContainer from 'components/layout/CenterContainer';
import FullSizeContainer from 'components/layout/FullSizeContainer';
import RoundedBox from 'components/RoundedBox';
import StyledButton from 'components/StyledButton';
import React from 'react';
import Scrollable from './Scrollable';

const Root = styled(Box)`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const MobileRoot = styled(FullSizeContainer)`
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

const MobileStepperContent = styled('div')`
	height: 100%;
	padding: ${(props) => props.theme.spacing(2)};
	overflow-y: scroll;
	background-color: ${(props) => props.theme.palette.background.default};
`;

const StyledMobileStepper = styled(MobileStepper)`
	color: ${(props) => props.theme.palette.background.paper};
	background-color: ${(props) => props.theme.palette.background.paper};
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
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const [loading, setLoading] = React.useState(false);
	const [activeStep, setActiveStep] = React.useState(0);

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

	if (isMobile) {
		return (
			<MobileRoot>
				<MobileStepperContent>{steps[activeStep].component}</MobileStepperContent>
				<StyledMobileStepper
					steps={steps.length}
					position="static"
					activeStep={activeStep}
					nextButton={
						<StyledButton onClick={handleNext} loading={loading}>
							{activeStep === steps.length - 1 ? 'Fertig' : 'Weiter'}
						</StyledButton>
					}
					backButton={
						<StyledButton variant="text" onClick={handleBack} disabled={loading || activeStep === 0}>
							Zurück
						</StyledButton>
					}
				/>
			</MobileRoot>
		);
	}

	return (
		<Scrollable>
			<CenterContainer maxWidth="md">
				<Root>
					<Stepper activeStep={activeStep} alternativeLabel>
						{steps.map((step) => (
							<Step key={step.label}>
								<StepLabel>{step.label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<StepWrapper padding={4}>
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
								{activeStep === steps.length - 1 ? 'Fertig' : 'Weiter'}
							</StyledButton>
						</ButtonWrapper>
					</StepWrapper>
				</Root>
			</CenterContainer>
		</Scrollable>
	);
};

export default StepperContainer;
