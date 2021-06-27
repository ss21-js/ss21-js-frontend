import { atom, selector } from 'recoil';
import { Company } from 'js-api-client';
import currentFirebaseUserState from 'store/auth/currentFirebaseUserState';
import onboardingPersistAtom from 'store/onboarding/onboardingPersistAtom';

const onboardingCompanyStateDefault = selector<Partial<Company>>({
	key: 'onboardingCompanyStateDefault',
	get: ({ get }) => {
		const firebaseUser = get(currentFirebaseUserState);

		return {
			email: firebaseUser?.email ?? '',
		};
	},
});

const onboardingCompanyState = atom<Partial<Company>>({
	key: 'onboardingCompanyState',
	default: onboardingCompanyStateDefault,
	effects_UNSTABLE: [onboardingPersistAtom],
});

export default onboardingCompanyState;
