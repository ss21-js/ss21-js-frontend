import { createAction } from 'deox';
import firebase from 'firebase';

export const setFirebaseUser = createAction('[Auth] Set FirebaseUser', (resolve) => (user: firebase.User | null) =>
	resolve(user)
);

export const logout = createAction('[Auth] Logout', (resolve) => () => resolve());

export type AuthActions = ReturnType<typeof setFirebaseUser> | ReturnType<typeof logout>;
