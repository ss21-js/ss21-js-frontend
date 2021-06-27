import React from 'react';
import { useRecoilValue } from 'recoil';
import currentUserTypeState from 'store/user/currentUserTypeState';
import Center from 'components/layout/Center';
import Typography from '@material-ui/core/Typography';
import UserType from 'models/userType';
import CurrentCompanyProfile from 'components/company/CompanyProfile/CurrentCompanyProfile';
import CurrentStudentProfile from 'components/student/StudentProfile/CurrentStudentProfile';

const CurrentUserProfile: React.FC = () => {
	const userType = useRecoilValue(currentUserTypeState);

	if (userType === null) {
		return (
			<Center>
				<Typography>Ladefehler</Typography>
			</Center>
		);
	}

	if (userType === UserType.COMPANY) {
		return <CurrentCompanyProfile />;
	}

	return <CurrentStudentProfile />;
};

export default CurrentUserProfile;
