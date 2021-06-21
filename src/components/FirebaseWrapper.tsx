import FullScreenLoading from 'components/FullScreenLoading';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentFirebaseUser } from 'store/auth';
import { firebaseAuth } from '..';

const FirebaseWrapper: React.FC = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const setCurrentFirebaseUser = useSetRecoilState(currentFirebaseUser);

	useEffect(() => {
		firebaseAuth.onIdTokenChanged((user) => {
			if (user) {
				user.getIdToken().then((value) => {
					setCurrentFirebaseUser({
						id: user.uid,
						idToken: value,
					});
					setLoading(false);
				});
			} else {
				setCurrentFirebaseUser(null);
				setLoading(false);
			}
		});
	}, [setCurrentFirebaseUser]);

	if (loading) {
		return <FullScreenLoading />;
	}

	return <>{children}</>;
};
export default FirebaseWrapper;
