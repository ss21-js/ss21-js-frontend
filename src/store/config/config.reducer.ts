import { createReducer } from 'deox';
import { toggleDrawerOpen } from './config.actions';
import { ConfigState } from './config.model';

const initialState: ConfigState = {
	drawerOpen: false,
};

const configReducer = createReducer(initialState, (handleAction) => [
	handleAction(toggleDrawerOpen, (state) => ({ ...state, drawerOpen: !state.drawerOpen })),
]);
export default configReducer;
