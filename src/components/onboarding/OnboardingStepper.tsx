import Box from '@material-ui/core/Box';
import MobileStepper from '@material-ui/core/MobileStepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { Theme } from '@material-ui/core/styles/createTheme';
import styled from '@material-ui/core/styles/styled';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import CenterContainer from 'components/layout/CenterContainer';
import FullSizeContainer from 'components/layout/FullSizeContainer';
import RoundedBox from 'components/RoundedBox';
import StyledButton from 'components/StyledButton';
import React from 'react';
import Scrollable from '../app/Scrollable';
import signOut from 'store/auth/signOut';
import { CircularProgress } from '@material-ui/core';
import Center from 'components/layout/Center';
import { useRecoilState } from 'recoil';
import onboardingStepState from 'store/onboarding/onboardingStepState';

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
	flex-grow: 1;
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
	onChange: (from: number, to: number) => Promise<boolean>;
}

const OnboardingStepper: React.FC<StepperContainerProps> = ({ steps, onChange }) => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const [loading, setLoading] = React.useState(false);
	const [activeStep, setActiveStep] = useRecoilState(onboardingStepState);

	const handleChange = async (newStep: number) => {
		setLoading(true);
		if (await onChange(activeStep, newStep)) {
			setActiveStep(newStep);
		}
		setLoading(false);
	};

	const handleNext = async () => handleChange(activeStep + 1);
	const handleBack = async () => handleChange(activeStep - 1);

	const component =
		activeStep >= steps.length ? (
			<Center>
				<CircularProgress />
			</Center>
		) : (
			steps[activeStep].component
		);

	if (isMobile) {
		return (
			<MobileRoot>
				<MobileStepperContent>{component}</MobileStepperContent>
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
						activeStep === 0 ? (
							<StyledButton onClick={signOut}>Ausloggen</StyledButton>
						) : (
							<StyledButton variant="text" onClick={handleBack} disabled={loading}>
								Zurück
							</StyledButton>
						)
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
						{component}
						<ButtonWrapper>
							{activeStep === 0 ? (
								<StyledButton onClick={signOut}>Ausloggen</StyledButton>
							) : (
								<StyledButton variant="text" onClick={handleBack} disabled={loading}>
									Zurück
								</StyledButton>
							)}
							<ButtonSpacer />
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

export default OnboardingStepper;
