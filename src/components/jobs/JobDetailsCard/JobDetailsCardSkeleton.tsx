import React from 'react';
import JobDetailsCardRoot from 'components/jobs/JobDetailsCard/JobDetailsCardRoot';
import Skeleton from '@material-ui/core/Skeleton';

const JobDetailsCardSkeleton: React.FC = () => {
	return (
		<JobDetailsCardRoot>
			<Skeleton variant="rectangular" />
		</JobDetailsCardRoot>
	);
};

export default JobDetailsCardSkeleton;
