import React from 'react';
import AppFrame from 'src/components/app/AppFrame';
import CompanyPage from 'src/pages/Company/CompanyPage';

const ProfilePage: React.FC = () => {
	return (
		<>
			<AppFrame>
				<h1>SearchBar</h1>
				<CompanyPage />
			</AppFrame>
		</>
	);
};

export default ProfilePage;
