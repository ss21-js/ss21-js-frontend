import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import RoundedBox from '../RoundedBox';
import TagBox from '../TagBox';
import { JobWithCompany } from 'js-api-client';
import ProfileLogo from 'components/profile/ProfileLogo';

export interface JobCardProps {
	job: JobWithCompany;
}

export const JobCardContent: React.FC<JobCardProps> = ({ job }) => {
	return (
		<>
			<ProfileLogo src={job.publisher.companyProfileImageUrl} width="72px" height="72px" />
			<Box marginTop={1} marginBottom={0.5}>
				<Typography variant="h6">{job.jobName}</Typography>
			</Box>
			<Box marginBottom={2}>
				<Typography variant="body1" component="p">
					{job.jobDescription}
				</Typography>
			</Box>
			<Grid container spacing={2} marginBottom={2}>
				{[...job.skills, ...job.languages].map((tag, index) => (
					<Grid key={index} item>
						<TagBox content={tag} />
					</Grid>
				))}
			</Grid>
		</>
	);
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
	return (
		<RoundedBox padding={3} width={'100%'}>
			<JobCardContent job={job} />
		</RoundedBox>
	);
};

export default JobCard;
