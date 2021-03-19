import { Typography } from '@material-ui/core';
import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import configureStore from './store/configureStore';
import ThemeWrapper from './ThemeWrapper';

const { persistor, store } = configureStore();

const ReduxRoot: React.FC = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={<Typography>Loading...</Typography>} persistor={persistor}>
				<ThemeWrapper>
					<App />
				</ThemeWrapper>
			</PersistGate>
		</Provider>
	);
};
export default ReduxRoot;
