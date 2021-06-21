import { initializeApp, SDK_VERSION } from 'firebase/app';
import { getAuth, useAuthEmulator } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { firebaseConfig, isProd } from './config';

const useEmulators = false;

const initializeFirebase = () => {
	// Initialize Firebase
	initializeApp(firebaseConfig);

	if (!isProd) {
		console.info(`Firebase-APP created ${SDK_VERSION}`);
	}

	const firebaseAuth = getAuth();
	firebaseAuth.languageCode = 'de';

	const firebaseStorage = getStorage();

	if (useEmulators) {
		/* eslint-disable react-hooks/rules-of-hooks */
		useAuthEmulator(firebaseAuth, 'http://localhost:9099');
	}

	return { firebaseAuth, firebaseStorage };
};
export default initializeFirebase;
