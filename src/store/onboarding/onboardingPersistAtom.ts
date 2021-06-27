import { recoilPersist } from 'recoil-persist';

export const onboardingPersistLocalStorageKey = 'onboarding';

const { persistAtom } = recoilPersist({
	key: onboardingPersistLocalStorageKey,
});

export default persistAtom;
