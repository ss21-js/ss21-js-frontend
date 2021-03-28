import { Typography } from '@material-ui/core';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import FirebaseWrapper from './firebase/FirebaseWrapper';
import configureStore from './store/configureStore';
import ThemeWrapper from './ThemeWrapper';

const { persistor, store } = configureStore();

const Root: React.FC = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={<Typography>Loading...</Typography>} persistor={persistor}>
				<ThemeWrapper>
					<BrowserRouter>
						<FirebaseWrapper>
							<App />
						</FirebaseWrapper>
					</BrowserRouter>
				</ThemeWrapper>
			</PersistGate>
		</Provider>
	);
};
export default Root;
