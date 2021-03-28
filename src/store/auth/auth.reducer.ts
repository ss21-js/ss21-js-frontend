import { createReducer } from 'deox';
import { logout, setFirebaseUser } from './auth.actions';
import type { AuthState } from './auth.model';

const initialState: AuthState = {
	firebaseUser: null,
	loading: true,
};

const authReducer = createReducer(initialState, (handleAction) => [
	handleAction(setFirebaseUser, (_, { payload }) => ({ firebaseUser: payload, loading: false })),
	handleAction(logout, (state) => ({ ...state, loading: true })),
]);
export default authReducer;
