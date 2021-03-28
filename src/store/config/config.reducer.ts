import { createReducer } from 'typesafe-actions';
import { toggleDrawerOpen } from './config.actions';
import { ConfigState } from './config.model';

const initialState: ConfigState = {
	drawerOpen: false,
};

const configReducer = createReducer(initialState).handleAction(toggleDrawerOpen, (state) => ({
	...state,
	drawerOpen: !state.drawerOpen,
}));
export default configReducer;
