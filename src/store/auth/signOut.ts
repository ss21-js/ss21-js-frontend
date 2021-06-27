import { firebaseAuth } from 'index';

const signOut = () => {
	firebaseAuth.signOut();
	window.location.reload();
};

export default signOut;
