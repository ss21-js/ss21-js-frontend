import { createReducer } from 'typesafe-actions';
import { setAuthError, setFirebaseUser, signIn, signInWith, signOut } from './auth.actions';
import type { AuthState } from './auth.model';

const initialState: AuthState = {
	firebaseUser: null,
	error: null,
	loading: true,
};

const authReducer = createReducer(initialState)
	.handleAction(setFirebaseUser, (_, action) => ({
		firebaseUser: action.payload,
		error: null,
		loading: false,
	}))
	.handleAction(setAuthError, (state, action) => ({
		...state,
		error: action.payload,
		loading: false,
	}))
	.handleAction(signIn.request, (state) => ({
		...state,
		error: null,
		loading: true,
	}))
	.handleAction(signInWith.request, (state) => ({
		...state,
		error: null,
		loading: true,
	}))
	.handleAction(signOut, (state) => ({
		...state,
		error: null,
		loading: true,
	}));
export default authReducer;
