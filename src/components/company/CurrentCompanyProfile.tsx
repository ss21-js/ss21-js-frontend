import { CircularProgress } from '@material-ui/core';
import CompanyProfile from 'components/company/CompanyProfile';
import FullScreenLoading from 'components/FullScreenLoading';
import Center from 'components/layout/Center';
import { Company } from 'js-api-client';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserAtom } from 'store/user';

const AsyncCurrentCompanyProfile: React.FC = () => {
	const currentUser = useRecoilValue(currentUserAtom);
	const company = currentUser as Company | undefined;

	if (company === undefined) {
		return (
			<Center>
				<CircularProgress />
			</Center>
		);
	}

	return <CompanyProfile company={company} />;
};

const CurrentCompanyProfile: React.FC = () => {
	return (
		<React.Suspense fallback={<FullScreenLoading />}>
			<AsyncCurrentCompanyProfile />
		</React.Suspense>
	);
};

export default CurrentCompanyProfile;
