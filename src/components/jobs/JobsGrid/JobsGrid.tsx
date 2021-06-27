import React, { createRef, useEffect } from 'react';
import { wrapGrid } from 'animate-css-grid';
import JobDetailsCard from 'components/jobs/JobDetailsCard/JobDetailsCard';
import JobCard from 'components/jobs/JobCard';
import { JobWithCompany } from 'js-api-client';
import JobsGridContainer from 'components/jobs/JobsGrid/JobsGridContainer';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import JobsGridJobWrapper from 'components/jobs/JobsGrid/JobsGridJobWrapper';
import JobsGridNoJobs from 'components/jobs/JobsGrid/JobsGridNoJobs';

const JobDetailsWrapper = styled('div')`
	grid-column: auto / span 2;
	grid-row: auto / span 3;

	${(props) => props.theme.breakpoints.down('md')} {
		grid-column: auto / span 3;
	}
`;

const JobCardButton = styled(Button)`
	text-transform: inherit;
	color: inherit;
	text-align: inherit;
	padding: 0;
	box-sizing: border-box;
	width: 100%;
`;

interface JobsGridContentProps {
	jobs: JobWithCompany[];
	jobId?: string;
	handleJobClick?: (jobId: string) => void;
	handleClose?: () => void;
}

const JobsGrid: React.FC<JobsGridContentProps> = ({ jobs, jobId, handleJobClick, handleClose }) => {
	const gridRef = createRef<HTMLDivElement>();
	useEffect(() => {
		if (gridRef.current) {
			wrapGrid(gridRef.current, { easing: 'backOut', stagger: 10, duration: 400 });
		}
	}, [gridRef]);

	if (jobs.length === 0) {
		return <JobsGridNoJobs />;
	}

	return (
		<JobsGridContainer ref={gridRef}>
			{jobs.map((job) => {
				const Wrapper = jobId === job.id ? JobDetailsWrapper : JobsGridJobWrapper;

				return (
					<Wrapper key={job.id}>
						{jobId === job.id ? (
							<JobDetailsCard jobId={jobId} handleClose={handleClose} />
						) : handleJobClick ? (
							<JobCardButton onClick={() => handleJobClick(job.id)}>
								<JobCard job={job} />
							</JobCardButton>
						) : (
							<JobCard job={job} />
						)}
					</Wrapper>
				);
			})}
		</JobsGridContainer>
	);
};

export default JobsGrid;
