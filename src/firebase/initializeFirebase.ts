import firebase from 'firebase';
import { isProd } from '../constants';
import firebaseConfig from './firebaseConfig';

const initializeFirebase = (): firebase.app.App => {
	// Initialize Firebase
	const app = firebase.initializeApp(firebaseConfig);

	// Set default language Code
	firebase.auth().languageCode = 'de';

	if (!isProd) {
		// eslint-disable-next-line no-console
		console.info(`Firebase-APP created ${firebase.SDK_VERSION}`);
	}

	return app;
};
export default initializeFirebase;
