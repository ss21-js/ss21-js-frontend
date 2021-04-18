import React from 'react';
import * as ReactDOM from 'react-dom';
import initializeFirebase from './firebase/initializeFirebase';
import Root from './Root';

export const { auth } = initializeFirebase();

const rootEl = document.getElementById('root');
ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	rootEl
);
