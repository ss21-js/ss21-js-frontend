import { createReducer } from 'deox';
import { purgeConfig, setDrawerOpen } from './config.actions';
import { ConfigState } from './config.model';

const initialState: ConfigState = {
	drawerOpen: false,
};

const configReducer = createReducer(initialState, (handleAction) => [
	handleAction(setDrawerOpen, (state, { payload }) => ({
		...state,
		drawerOpen: payload.event,
	})),
	handleAction(purgeConfig, () => initialState),
]);
export default configReducer;
