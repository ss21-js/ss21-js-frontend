import firebase from 'firebase';
import { atom, useSetRecoilState } from 'recoil';
import { firebaseAuth } from '..';

export interface CurrentUser {
	id: string;
	idToken: string;
}

export const currentFirebaseUser = atom<CurrentUser | null>({
	key: 'currentFirebaseUser',
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

		firebaseAuth
			.signInWithEmailAndPassword(arg.email, arg.password)
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

		if (provider === OAuthProvider.Google) {
			firebaseAuthProvider = new firebase.auth.GoogleAuthProvider();
		} else if (provider === OAuthProvider.Apple) {
			const appleProvider = new firebase.auth.OAuthProvider('apple.com');

			appleProvider.addScope('email');
			appleProvider.addScope('name');

			firebaseAuthProvider = appleProvider;
		} else if (provider === OAuthProvider.Microsoft) {
			const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com');

			microsoftProvider.addScope('mail.read');

			firebaseAuthProvider = microsoftProvider;
		} else if (provider === OAuthProvider.Github) {
			firebaseAuthProvider = new firebase.auth.GithubAuthProvider();
		} else {
			return;
		}

		firebaseAuth
			.signInWithPopup(firebaseAuthProvider)
			.then(() => setAuthState({ loading: false, error: null }))
			.catch((error: firebase.auth.AuthError) => setAuthState({ loading: false, error: error.message }));
	};
};

export const signOut = () => firebaseAuth.signOut();
