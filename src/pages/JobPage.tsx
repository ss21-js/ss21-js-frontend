import React from 'react';
import AppFrame from 'components/app/AppFrame';
import JobDetailsCard from 'components/jobs/JobDetailsCard/JobDetailsCard';
import { useRouteParams } from 'react-typesafe-routes';
import router from '../Router';
import Scrollable from 'components/app/Scrollable';
import CenterContainer from 'components/layout/CenterContainer';

const JobPage: React.FC = () => {
	const { id } = useRouteParams(router.app.children.job);

	return (
		<AppFrame>
			<Scrollable>
				<CenterContainer maxWidth="lg">
					<JobDetailsCard jobId={id} shrink />
				</CenterContainer>
			</Scrollable>
		</AppFrame>
	);
};

export default JobPage;
