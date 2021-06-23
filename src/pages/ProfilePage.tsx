import Typography from '@material-ui/core/Typography';
import AppFrame from 'components/app/AppFrame';
import CompanyProfile from 'components/company/CompanyProfile';
import FullScreenLoading from 'components/FullScreenLoading';
import Center from 'components/layout/Center';
import StudentProfile from 'components/student/StudentProfile';
import { Company, Student } from 'js-api-client';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserAtom, currentUserTypeAtom, UserType } from 'store/user';

const AsyncCurrentUserProfile: React.FC = () => {
	const currentUser = useRecoilValue(currentUserAtom);
	const userType = useRecoilValue(currentUserTypeAtom);

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
