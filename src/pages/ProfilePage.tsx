import React from 'react';
import AppFrame from 'src/components/app/AppFrame';
import ProfilHeader from '../components/profile/ProfileHeader';

const ProfilePage: React.FC = () => {
	return (
		<AppFrame>
			{/* TODO: Mit BE Daten füllen */}
			<ProfilHeader
				firstName={''}
				lastName={''}
				companyName={'BMW Group GmbH'}
				type={'Unternehmen'}
				adress={[]}
			/>{' '}
			,
		</AppFrame>
	);
};

export default ProfilePage;
