import { createReducer } from 'typesafe-actions';
import { dismissSnackbar, showSnackbar } from './snackbar.actions';
import { SnackbarState } from './snackbar.model';

const initialState = null as SnackbarState;

const snackbarReducer = createReducer(initialState)
	.handleAction(showSnackbar, (_, { payload }) => payload)
	.handleAction(dismissSnackbar, () => null);

export default snackbarReducer;
