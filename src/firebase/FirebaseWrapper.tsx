import firebase from 'firebase';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setFirebaseUser } from '../store';

const FirebaseWrapper: React.FC = ({ children }) => {
	const dispatch = useDispatch();

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			dispatch(setFirebaseUser(user));
		} else {
			dispatch(setFirebaseUser(null));
		}
	});

	return <>{children}</>;
};
export default FirebaseWrapper;
