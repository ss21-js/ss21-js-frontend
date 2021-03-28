import firebase from 'firebase';

export interface AuthState {
	firebaseUser: firebase.User | null;
	loading: boolean;
}
