import { atom } from 'recoil';
import onboardingPersistAtom from 'store/onboarding/onboardingPersistAtom';

const onboardingStepState = atom<number>({
	key: 'onboardingStepState',
	default: 0,
	effects_UNSTABLE: [onboardingPersistAtom],
});

export default onboardingStepState;
