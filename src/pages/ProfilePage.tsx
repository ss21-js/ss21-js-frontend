import Typography from '@material-ui/core/Typography';
import AppFrame from 'components/app/AppFrame';
import CompanyProfile from 'components/company/CompanyProfile';
import FullScreenLoading from 'components/FullScreenLoading';
import Center from 'components/layout/Center';
import StudentProfile from 'components/student/StudentProfile';
import { Company, Student } from 'js-api-client';
import UserType from 'models/userType';
import React from 'react';
import { useRouteParams } from 'react-typesafe-routes';
import { useRecoilValue } from 'recoil';
import router from 'Router';
import currentUserState from 'store/user/currentUserState';
import currentUserTypeState from 'store/user/currentUserTypeState';
import userProfileByIdQuery from 'store/user/userProfileByIdQuery';

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

interface AsyncUserProfileProps {
	id: string;
}

const AsyncUserProfile: React.FC<AsyncUserProfileProps> = ({ id }) => {
	const userProfile = useRecoilValue(userProfileByIdQuery(id));

	if (userProfile === null) {
		return (
			<Center>
				<Typography>Profil existiert nicht</Typography>
			</Center>
		);
	}

	if (userProfile.type === UserType.COMPANY) {
		return <CompanyProfile company={userProfile.data as Company} />;
	}

	return <StudentProfile student={userProfile.data as Student} />;
};

const ProfilePage: React.FC = () => {
	const { id } = useRouteParams(router.app.children.profile);

	return (
		<AppFrame>
			<React.Suspense fallback={<FullScreenLoading />}>
				{id ? <AsyncUserProfile id={id} /> : <AsyncCurrentUserProfile />}
			</React.Suspense>
		</AppFrame>
	);
};

export default ProfilePage;
