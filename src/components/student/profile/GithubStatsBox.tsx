import { faGitAlt } from '@fortawesome/free-brands-svg-icons/faGitAlt';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import RoundedBox from 'components/RoundedBox';
import React from 'react';

export interface GithubStatsBoxProps {
	username: string;
}

const GithubStatsBox: React.FC<GithubStatsBoxProps> = ({ username }) => {
	return (
		<RoundedBox padding={3}>
			<Typography variant="h6">{username}'s GitHub Stats</Typography>

			<Box marginTop={2}>
				<Typography variant="subtitle1" component="p">
					<FontAwesomeIcon icon={faStar} size="lg" color="#0B77BF" />
					&nbsp;Total Stars: <span>12</span>
				</Typography>
				<Typography variant="subtitle1" component="p">
					<FontAwesomeIcon icon={faHistory} size="lg" color="#0B77BF" />
					&nbsp;Total Commits: <span>12</span>
				</Typography>
				<Typography variant="subtitle1" component="p">
					<FontAwesomeIcon icon={faGitAlt} size="lg" color="#0B77BF" />
					&nbsp;Total PRs: <span>12</span>
				</Typography>
				<Typography variant="subtitle1" component="p">
					<FontAwesomeIcon icon={faExclamationCircle} size="lg" color="#0B77BF" />
					&nbsp;Total Issues: <span>12</span>
				</Typography>
				<Typography variant="subtitle1" component="p">
					<FontAwesomeIcon icon={faGitAlt} size="lg" color="#0B77BF" />
					&nbsp;Contributed to: <span>12</span>
				</Typography>
			</Box>
		</RoundedBox>
	);
};

export default GithubStatsBox;
