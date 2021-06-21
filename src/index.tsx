import React from 'react';
import * as ReactDOM from 'react-dom';
import initializeFirebase from './common/initializeFirebase';
import Root from './Root';

export const { firebaseAuth, firebaseStorage } = initializeFirebase();

const rootEl = document.getElementById('root');

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	rootEl
);
