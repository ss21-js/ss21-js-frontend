import JobCardSkeleton from 'components/jobs/JobCardSkeleton';
import React from 'react';
import JobsGridContainer from 'components/jobs/JobsGrid/JobsGridContainer';
import JobsGridJobWrapper from 'components/jobs/JobsGrid/JobsGridJobWrapper';

const JobsGridSkeleton = () => {
	return (
		<JobsGridContainer>
			{Array(10)
				.fill(1)
				.map((_, i) => {
					return (
						<JobsGridJobWrapper key={i}>
							<JobCardSkeleton />
						</JobsGridJobWrapper>
					);
				})}
		</JobsGridContainer>
	);
};

export default JobsGridSkeleton;
