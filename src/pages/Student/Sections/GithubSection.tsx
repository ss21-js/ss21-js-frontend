import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Container from '@material-ui/core/Container/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RoundedBox from '../../../components/RoundedBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faGitAlt } from '@fortawesome/free-brands-svg-icons/faGitAlt';
import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core/styles';

export interface LanguageStat {
	name: string;
	count: number;
}
interface ProfileGithubProps {
	username: string;
	languages: LanguageStat[];
}

const GithubSection: React.FC<ProfileGithubProps> = ({ username, languages }) => {
	const theme = useTheme();

	const fillLabels = languages.map((language) => language.name);
	const fillStats = languages.map((language) => language.count);


	const colors = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40'];

	const data = {
		labels: fillLabels,
		datasets: [
			{
				label: 'Languages',
				data: fillStats,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: colors,
				borderWidth: 1,
			},
		],
	};

	const option = {
		responsive: true,
		layout: {
			padding: 50,
		},
		plugins: {
			legend: {
				display: true,
				position: 'bottom',
				align: 'center',
				labels: {
					font: {
						lineHeight: 1.5,
						size: 14,
						weight: 400,
					},
					padding: 15,
					textAlign: 'left',
				},
			},
		},
	};

	return (
		<Container>
			<RoundedBox marginTop={16}
				css={css`
					width: 350px;
					border: solid ${theme.palette.divider} 1px;
				`}
			>
				<Box marginTop={1} marginBottom={0.5}>
					<Typography variant="h6" textAlign="center">
						GitHub Repositories
					</Typography>
					<Typography variant="subtitle2" textAlign="center">
						Verteilung der verwendeten Programmiersprachen
					</Typography>
				</Box>
				<Box marginBottom={0}>
					<Doughnut data={data} type={Doughnut} options={option} />
				</Box>
			</RoundedBox>
			<RoundedBox padding={3} marginTop={3} css={css`
              width: 350px;
              border: solid ${theme.palette.divider} 1px;
			`}>
				<Box marginTop={1} marginBottom={0.5}>
					<Typography variant="h6">{username}'s GitHub Stats</Typography>
				</Box>
				<Box marginBottom={2}>
					<Typography variant="subtitle1" component="p">
						<FontAwesomeIcon icon={faStar} size="lg" color="#0B77BF" />
						Total Stars: <span>12</span>
					</Typography>
					<Typography variant="subtitle1" component="p">
						<FontAwesomeIcon icon={faHistory} size="lg" color="#0B77BF" />
						Total Commits: <span>12</span>
					</Typography>
					<Typography variant="subtitle1" component="p">
						<FontAwesomeIcon icon={faGitAlt} size="lg" color="#0B77BF" />
						Total PRs: <span>12</span>
					</Typography>
					<Typography variant="subtitle1" component="p">
						<FontAwesomeIcon icon={faExclamationCircle} size="lg" color="#0B77BF" />
						Total Issues: <span>12</span>
					</Typography>
					<Typography variant="subtitle1" component="p">
						<FontAwesomeIcon icon={faGitAlt} size="lg" color="#0B77BF" />
						Contributed to: <span>12</span>
					</Typography>
				</Box>
			</RoundedBox>
		</Container>
	);
};

export default GithubSection;
