import React from 'react';
import { useRecoilValue } from 'recoil';
import jobSearchQuery from 'store/jobs/jobSearchQuery';
import JobsGrid from 'components/jobs/JobsGrid/JobsGrid';
import JobsGridSkeleton from 'components/jobs/JobsGrid/JobsGridSkeleton';

const AsyncJobsGrid: React.FC<JobsGridProps> = ({ jobId, handleJobClick, handleClose }) => {
	const jobs = useRecoilValue(jobSearchQuery);

	return <JobsGrid jobs={jobs ?? []} jobId={jobId} handleJobClick={handleJobClick} handleClose={handleClose} />;
};

interface JobsGridProps {
	jobId?: string;
	handleJobClick: (jobId: string) => void;
	handleClose: () => void;
}

const SearchJobsGrid: React.FC<JobsGridProps> = (props) => {
	return (
		<React.Suspense fallback={<JobsGridSkeleton />}>
			<AsyncJobsGrid {...props} />
		</React.Suspense>
	);
};

export default SearchJobsGrid;
