import { createReducer } from 'deox';
import { dismissSnackbar, showSnackbar } from './snackbar.actions';
import { SnackbarState } from './snackbar.model';

const defaultState = null as SnackbarState;

const snackbarReducer = createReducer(defaultState, (handleAction) => [
	handleAction(showSnackbar, (_, { payload }) => payload),
	handleAction(dismissSnackbar, () => null),
]);
export default snackbarReducer;
