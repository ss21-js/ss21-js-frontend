import AppFrame from 'components/app/AppFrame';
import FullScreenLoading from 'components/FullScreenLoading';
import React from 'react';
import { useRouteParams } from 'react-typesafe-routes';
import router from 'Router';
import CurrentUserProfile from 'components/profile/CurrentUserProfile';
import UserProfile from 'components/profile/UserProfile';

const ProfilePage: React.FC = () => {
	const { id } = useRouteParams(router.app.children.otherProfile);

	return (
		<AppFrame>
			<React.Suspense fallback={<FullScreenLoading />}>
				{id ? <UserProfile id={id} /> : <CurrentUserProfile />}
			</React.Suspense>
		</AppFrame>
	);
};

export default ProfilePage;
