import firebase from 'firebase';

export interface AuthState {
	firebaseUser: firebase.User | null;
	error: string | null;
	loading: boolean;
}

export interface SignInWithEmail {
	email: string;
	password: string;
}

export enum OAuthProvider {
	google,
	apple,
	microsoft,
	github,
}
