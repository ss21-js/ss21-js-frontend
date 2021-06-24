import Typography from '@material-ui/core/Typography';
import AppFrame from 'components/app/AppFrame';
import CompanyProfile from 'components/company/CompanyProfile';
import FullScreenLoading from 'components/FullScreenLoading';
import Center from 'components/layout/Center';
import StudentProfile from 'components/student/StudentProfile';
import { Company, Student } from 'js-api-client';
import UserType from 'models/userType';
import React from 'react';
import { useRecoilValue } from 'recoil';
import currentUserState from 'store/user/currentUserState';
import currentUserTypeState from 'store/user/currentUserTypeState';

const AsyncCurrentUserProfile: React.FC = () => {
	const currentUser = useRecoilValue(currentUserState);
	const userType = useRecoilValue(currentUserTypeState);

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

	return <StudentProfile student={currentUser as Student} editable />;
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
