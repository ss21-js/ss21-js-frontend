import { experimentalStyled as styled } from '@material-ui/core/styles';
import { wrapGrid } from 'animate-css-grid';
import Center from 'components/layout/Center';
import React, { createRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import router from 'Router';
import jobSearchQuery from 'store/jobs/jobSearchQuery';
import JobCard from './JobCard';
import JobCardSkeleton from './JobCardSkeleton';
import JobDetailsCard from './JobDetailsCard';

const JobWrapper = styled('div')`
	grid-column: 'auto / span 1';
`;

const JobsContainer = styled('div')`
	grid-area: jobs;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: ${(props) => props.theme.spacing(4)};
	${(props) => props.theme.breakpoints.down('lg')} {
		grid-template-columns: repeat(2, 1fr);
	}
	${(props) => props.theme.breakpoints.down('md')} {
		grid-template-columns: repeat(1, 1fr);
	}
`;

const JobDetailsWrapper = styled('div')`
	grid-column: auto / span 2;
	grid-row: auto / span 3;

	${(props) => props.theme.breakpoints.down('md')} {
		grid-column: auto / span 3;
	}
`;

const JobsSkeleton = () => {
	return (
		<JobsContainer>
			{Array(10)
				.fill(1)
				.map((_, i) => {
					return (
						<JobWrapper key={i}>
							<JobCardSkeleton />
						</JobWrapper>
					);
				})}
		</JobsContainer>
	);
};

const NoJobsCenter = styled(Center)`
	grid-column: auto / span 3;
	grid-row: auto / span 3;
`;

const NoJobsContainer = () => {
	return <NoJobsCenter>Keine Jobs gefunden</NoJobsCenter>;
};

const AsyncJobsGrid: React.FC<JobsGridProps> = ({ jobId }) => {
	const jobs = useRecoilValue(jobSearchQuery);

	const gridRef = createRef<HTMLDivElement>();
	useEffect(() => {
		if (gridRef.current) {
			wrapGrid(gridRef.current, { easing: 'backOut', stagger: 10, duration: 400 });
		}
	}, [gridRef]);

	const history = useHistory();
	const handleJobClick = (newJobId: string) => {
		if (jobId === newJobId) {
			history.push(router.app().jobs({}).$);
		} else {
			history.push(router.app().jobs({ jobId: newJobId }).$);
		}
	};

	const handleClose = () => {
		history.push(router.app().jobs({}).$);
	};

	return (
		<JobsContainer ref={gridRef}>
			{jobs !== null ? (
				jobs.map((job, i) => {
					const Wrapper = jobId === i.toString() ? JobDetailsWrapper : JobWrapper;

					return (
						<Wrapper key={i}>
							{jobId === i.toString() ? (
								<JobDetailsCard jobId={jobId} handleClose={handleClose} />
							) : (
								<JobCard
									title={job.jobName}
									description={job.jobDescription}
									image={''}
									tags={['Full-Time', '1 year Experience']}
									selected={jobId === i.toString()}
									onClick={() => handleJobClick(i.toString())}
								/>
							)}
						</Wrapper>
					);
				})
			) : (
				<NoJobsContainer />
			)}
		</JobsContainer>
	);
};

interface JobsGridProps {
	jobId?: string;
}

const JobsGrid: React.FC<JobsGridProps> = (props) => {
	return (
		<React.Suspense fallback={<JobsSkeleton />}>
			<AsyncJobsGrid {...props} />
		</React.Suspense>
	);
};

export default JobsGrid;
