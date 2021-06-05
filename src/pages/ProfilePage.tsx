import React from 'react';
import AppFrame from 'src/components/app/AppFrame';
import ProfilHeader from '../components/profile/ProfileHeader';

const ProfilePage: React.FC = () => {
	return (
		<AppFrame>
			{/* TODO: Fill data with BE */}
			<ProfilHeader
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
