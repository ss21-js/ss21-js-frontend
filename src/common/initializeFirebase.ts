import firebase from 'firebase';
import { firebaseConfig, isProd } from './config';

const useEmulators = false;

const initializeFirebase = () => {
	// Initialize Firebase
	const app = firebase.initializeApp(firebaseConfig);

	// Set default language Code
	firebase.auth().languageCode = 'de';

	if (!isProd) {
		console.info(`Firebase-APP created ${firebase.SDK_VERSION}`);
	}

	let firebaseAuth = app.auth();

	if (useEmulators) {
		firebaseAuth.useEmulator('http://localhost:9099');
	}

	return { firebaseAuth };
};
export default initializeFirebase;
