import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from 'index';
import { useSetRecoilState } from 'recoil';
import authState from './authState';
import EmailPassword from './emailPassword';
import { onboardingPersistLocalStorageKey } from 'store/onboarding/onboardingPersistAtom';

const useSignIn = () => {
	const setAuthState = useSetRecoilState(authState);

	return async (arg: EmailPassword) => {
		setAuthState({
			loading: true,
			error: null,
		});

		signInWithEmailAndPassword(firebaseAuth, arg.email, arg.password)
			.then(() => {
				setAuthState({ loading: false, error: null });
				localStorage.removeItem(onboardingPersistLocalStorageKey);
			})
			.catch((error: AuthError) => setAuthState({ loading: false, error: error.message }));
	};
};

export default useSignIn;
