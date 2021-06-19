import Typography from '@material-ui/core/Typography';
import AppFrame from 'components/app/AppFrame';
import CompanyProfile from 'components/company/CompanyProfile';
import FullScreenLoading from 'components/FullScreenLoading';
import Center from 'components/layout/Center';
import { Company } from 'js-api-client';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserAtom, UserType, userTypeQuery } from 'store/user';

const AsyncCurrentUserProfile: React.FC = () => {
	const currentUser = useRecoilValue(currentUserAtom);
	const userType = useRecoilValue(userTypeQuery);

	if (currentUser === null) {
		return (
			<Center>
				<Typography>Ladefehler</Typography>
			</Center>
		);
	}

	if (userType === UserType.COMPANY) {
		return <CompanyProfile company={currentUser as Company} editable />;
	}

	return <div />;
};

const ProfilePage: React.FC = () => {
	return (
		<AppFrame>
			<React.Suspense fallback={<FullScreenLoading />}>
				<AsyncCurrentUserProfile />
			</React.Suspense>
		</AppFrame>
	);
};

export default ProfilePage;
