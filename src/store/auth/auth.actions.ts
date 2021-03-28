import firebase from 'firebase';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { OAuthProvider, SignInWithEmail } from './auth.model';

export const signIn = createAsyncAction('SIGN_IN', 'SIGN_IN_SUCCESS', 'SIGN_IN_FAILURE')<SignInWithEmail, void, void>();

export const signInWith = createAsyncAction('SIGN_IN_WITH', 'SIGN_IN_WITH_SUCCESS', 'SIGN_IN_WITH_FAILURE')<
	OAuthProvider,
	void,
	void
>();

export const signOut = createAction('SIGN_OUT')();

export const setFirebaseUser = createAction('SET_FIREBASE_USER')<firebase.User | null>();

export const setAuthError = createAction('SET_AUTH_ERROR')<string | null>();
