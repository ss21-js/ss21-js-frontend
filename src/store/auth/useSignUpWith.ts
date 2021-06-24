import {
	AuthError,
	AuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
	OAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { firebaseAuth } from 'index';
import { useSetRecoilState } from 'recoil';
import authState from './authState';

export enum SignInWithProvider {
	Google,
	Apple,
	Microsoft,
	Github,
}

const useSignInWith = () => {
	const setAuthState = useSetRecoilState(authState);

	return async (provider: SignInWithProvider) => {
		setAuthState({
			loading: true,
			error: null,
		});

		let firebaseAuthProvider: AuthProvider;

		if (provider === SignInWithProvider.Google) {
			firebaseAuthProvider = new GoogleAuthProvider();
		} else if (provider === SignInWithProvider.Apple) {
			const appleProvider = new OAuthProvider('apple.com');

			appleProvider.addScope('email');
			appleProvider.addScope('name');

			firebaseAuthProvider = appleProvider;
		} else if (provider === SignInWithProvider.Microsoft) {
			const microsoftProvider = new OAuthProvider('microsoft.com');

			microsoftProvider.addScope('mail.read');

			firebaseAuthProvider = microsoftProvider;
		} else if (provider === SignInWithProvider.Github) {
			firebaseAuthProvider = new GithubAuthProvider();
		} else {
			return;
		}

		signInWithPopup(firebaseAuth, firebaseAuthProvider)
			.then(() => setAuthState({ loading: false, error: null }))
			.catch((error: AuthError) => setAuthState({ loading: false, error: error.message }));
	};
};

export default useSignInWith;
