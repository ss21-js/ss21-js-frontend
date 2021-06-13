import AppFrame from 'components/app/AppFrame';
import React from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';

const ProfilePage: React.FC = () => {
	return (
		<AppFrame>
			{/* TODO: Fill data with BE */}
			<ProfileHeader
				firstName={''}
				lastName={''}
				companyName={'BMW Group GmbH'}
				type={'Unternehmen'}
				address={[]}
			/>{' '}
			,
		</AppFrame>
	);
};

export default ProfilePage;
