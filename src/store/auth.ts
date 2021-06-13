import firebase from 'firebase';
import { atom, useSetRecoilState } from 'recoil';
import { auth } from 'src';

export const currentUserId = atom<string | null>({
	key: 'currentUser',
	default: null,
});

interface AuthState {
	loading: boolean;
	error: string | null;
}
export const authState = atom<AuthState>({
	key: 'authLoading',
	default: {
		loading: false,
		error: null,
	},
});

export interface SignInWithEmail {
	email: string;
	password: string;
}
export const useSignIn = () => {
	const setAuthState = useSetRecoilState(authState);

	return async (arg: SignInWithEmail) => {
		setAuthState({
			loading: true,
			error: null,
		});

		auth.signInWithEmailAndPassword(arg.email, arg.password)
			.then(() => setAuthState({ loading: false, error: null }))
			.catch((error: firebase.auth.AuthError) => setAuthState({ loading: false, error: error.message }));
	};
};

export enum OAuthProvider {
	Google,
	Apple,
	Microsoft,
	Github,
}
export const useSignInWith = () => {
	const setAuthState = useSetRecoilState(authState);

	return async (provider: OAuthProvider) => {
		setAuthState({
			loading: true,
			error: null,
		});

		let firebaseAuthProvider: firebase.auth.AuthProvider;

		if (provider == OAuthProvider.Google) {
			firebaseAuthProvider = new firebase.auth.GoogleAuthProvider();
		} else if (provider == OAuthProvider.Apple) {
			const appleProvider = new firebase.auth.OAuthProvider('apple.com');

			appleProvider.addScope('email');
			appleProvider.addScope('name');

			firebaseAuthProvider = appleProvider;
		} else if (provider == OAuthProvider.Microsoft) {
			const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com');

			microsoftProvider.addScope('mail.read');

			firebaseAuthProvider = microsoftProvider;
		} else if (provider == OAuthProvider.Github) {
			firebaseAuthProvider = new firebase.auth.GithubAuthProvider();
		} else {
			return;
		}

		auth.signInWithPopup(firebaseAuthProvider)
			.then(() => setAuthState({ loading: false, error: null }))
			.catch((error: firebase.auth.AuthError) => setAuthState({ loading: false, error: error.message }));
	};
};

export const useSignOut = () => auth.signOut();
