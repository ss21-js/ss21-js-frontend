import React from 'react';
import { useRecoilValue } from 'recoil';
import userProfileByIdQuery from 'store/user/userProfileByIdQuery';
import Center from 'components/layout/Center';
import Typography from '@material-ui/core/Typography';
import UserType from 'models/userType';
import { Company, Student } from 'js-api-client';
import StudentProfile from 'components/student/StudentProfile';
import CompanyProfile from 'components/company/CompanyProfile';

interface UserProfileProps {
	id: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ id }) => {
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

export default UserProfile;
