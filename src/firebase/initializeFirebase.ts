import firebase from 'firebase';
import { isProd } from '../constants';
import firebaseConfig from './firebaseConfig';

const useEmulators = false;

const initializeFirebase = () => {
	// Initialize Firebase
	const app = firebase.initializeApp(firebaseConfig);

	// Set default language Code
	firebase.auth().languageCode = 'de';

	if (!isProd) {
		console.info(`Firebase-APP created ${firebase.SDK_VERSION}`);
	}

	let auth = app.auth();

	if (useEmulators) {
		auth.useEmulator('http://localhost:9099');
	}

	return { auth };
};
export default initializeFirebase;
