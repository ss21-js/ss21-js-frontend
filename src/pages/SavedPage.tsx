import AppFrame from 'components/app/AppFrame';
import React from 'react';
import JobsGrid from 'components/jobs/JobsGrid/JobsGrid';
import { useRecoilValue } from 'recoil';
import jobsSavedQuery from 'store/jobs/jobsSavedQuery';
import JobsGridSkeleton from 'components/jobs/JobsGrid/JobsGridSkeleton';
import router from '../Router';
import { useRouteParams } from 'react-typesafe-routes';
import { useHistory } from 'react-router';
import Box from '@material-ui/core/Box';

const SavedJobsGrid: React.FC = () => {
	const savedJobs = useRecoilValue(jobsSavedQuery);

	const history = useHistory();
	const { jobId } = useRouteParams(router.app.children.saved);

	const handleClose = () => {
		history.push(router.app().saved({}).$);
	};

	const handleJobClick = (newJobId: string) => {
		if (jobId === newJobId) {
			handleClose();
		} else {
			history.push(router.app().saved({ jobId: newJobId }).$);
		}
	};

	return <JobsGrid jobs={savedJobs ?? []} jobId={jobId} handleClose={handleClose} handleJobClick={handleJobClick} />;
};

const SavedPage: React.FC = () => {
	return (
		<AppFrame>
			<Box padding={4} minHeight={'100%'}>
				<React.Suspense fallback={<JobsGridSkeleton />}>
					<SavedJobsGrid />
				</React.Suspense>
			</Box>
		</AppFrame>
	);
};

export default SavedPage;
