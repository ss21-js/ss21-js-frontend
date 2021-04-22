import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { Job } from 'src/model/job';

interface JobListProps {
	counter: number;
	jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ counter, jobs }) => {
	const theme = useTheme();

	return (
		<List component="div" disablePadding>
			{jobs.map((job) => (
				<ListItem
					key={job.index}
					button
					css={css`
						padding-left: ${theme.spacing(4)};
					`}
				>
					<ListItemIcon>
						<Checkbox color="primary" />
					</ListItemIcon>
					<ListItemText primary={job.title} />
					{/* TODO: counter-Function ergänzen, sobald es vom BE verfügbar ist */}
					<Chip label={counter} />
				</ListItem>
			))}
		</List>
	);
};
export default JobList;
