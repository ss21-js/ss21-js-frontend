import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { auth } from 'src';
import Center from 'src/components/layout/Center';
import { currentUserId } from 'src/store/auth';

const FirebaseWrapper: React.FC = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const setCurrentUserId = useSetRecoilState(currentUserId);

	useEffect(() => {
		auth.onIdTokenChanged((user) => {
			if (user) {
				setCurrentUserId(user.uid);
			} else {
				setCurrentUserId(null);
			}

			if (loading) {
				setLoading(false);
			}
		});
	}, []);

	if (loading) {
		return (
			<Center>
				<CircularProgress />
			</Center>
		);
	}

	return <>{children}</>;
};
export default FirebaseWrapper;
