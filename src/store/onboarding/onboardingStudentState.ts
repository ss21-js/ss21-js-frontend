import { atom, selector } from 'recoil';
import { Student } from 'js-api-client';
import currentFirebaseUserState from 'store/auth/currentFirebaseUserState';
import WorkArea from 'models/workArea';
import WorkBasis from 'models/workBasis';
import onboardingPersistAtom from 'store/onboarding/onboardingPersistAtom';

const onboardingStudentStateDefault = selector<Partial<Student>>({
	key: 'onboardingStudentStateDefault',
	get: ({ get }) => {
		const firebaseUser = get(currentFirebaseUserState);

		return {
			email: firebaseUser?.email ?? '',
			workArea: WorkArea.NONE.valueOf(),
			workBasis: WorkBasis.NONE.valueOf(),
			languages: [],
			skills: [],
		};
	},
});

const onboardingStudentState = atom<Partial<Student>>({
	key: 'onboardingStudentState',
	default: onboardingStudentStateDefault,
	effects_UNSTABLE: [onboardingPersistAtom],
});

export default onboardingStudentState;
