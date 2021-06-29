import { faGitAlt } from '@fortawesome/free-brands-svg-icons';
import { faHistory, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import RoundedBox from 'components/RoundedBox';
import React from 'react';
import githubQuery from 'store/user/githubQuery';
import { useRecoilValue } from 'recoil';

export interface GithubStatsBoxProps {
	username: string;
}

const GithubStatsBox: React.FC<GithubStatsBoxProps> = ({ username }) => {

	const repos = useRecoilValue(githubQuery(username));

	const starsMap = repos.map((repo:any) => (repo.stargazers_count));
	const starsArr = Array.from(starsMap);
		let stars = 0;
	for(let i = 0; i < starsArr.length; i++) {
		stars = stars + Number(starsArr[i]);
	}

	const forksMap = repos.map((repo:any) => (repo.forks_count));
	const forksArr = Array.from(forksMap);
	let forks = 0;
	for(let i = 0; i < forksArr.length; i++) {
		forks = forks + Number(forksArr[i]);
	}

	const watchersMap = repos.map((repo:any) => (repo.watchers_count));
	const watchersArr = Array.from(watchersMap);
	let watchers = 0;
	for(let i = 0; i < watchersArr.length; i++) {
		watchers = watchers + Number(watchersArr[i]);
	}
	return (
		<RoundedBox padding={3}>
			<Typography variant="h6">{username}'s GitHub Stats</Typography>
			<Box marginTop={2}>
				<Typography variant="subtitle1" component="p">
					<FontAwesomeIcon icon={faStar} size="lg" color="#0B77BF" />
					&nbsp;Total Stars: <span>{stars}</span>
				</Typography>
				<Typography variant="subtitle1" component="p">
					<FontAwesomeIcon icon={faHistory} size="lg" color="#0B77BF" />
					&nbsp;Watchers: <span>{watchers}</span>
				</Typography>
				<Typography variant="subtitle1" component="p">
					<FontAwesomeIcon icon={faGitAlt} size="lg" color="#0B77BF" />
					&nbsp;Forks: <span>{forks}</span>
				</Typography>
			</Box>
		</RoundedBox>
	);
};

export default GithubStatsBox;
