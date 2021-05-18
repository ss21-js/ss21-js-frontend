import Grid from '@material-ui/core/Grid';
import React from 'react';
import Job from 'src/model/job';
import JobCard from './JobCard';

export interface JobGridProps {
	jobs: Job[];
	activeJobId: string | null;
	singleColumn: boolean;
	onJobClick: (jobId: string) => void;
}

const JobGrid: React.FC<JobGridProps> = ({ singleColumn, onJobClick, activeJobId }) => {
	return (
		<Grid container spacing={4}>
			{Array(30)
				.fill(1)
				.map((_, i) => (
					<Grid item lg={singleColumn ? 12 : 4} md={singleColumn ? 12 : 6} xs={12} key={i}>
						<JobCard
							title="UI/UX Designer"
							description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
							image="https://preview.redd.it/iraq6sc6o3qz.jpg?auto=webp&s=dc0dfa00121359da7129d4efd9fbfc64635eac20"
							tags={['Full-Time', '1 year Experience']}
							selected={activeJobId === i.toString()}
							onClick={() => onJobClick(i.toString())}
						/>
					</Grid>
				))}
		</Grid>
	);
};

export default JobGrid;
