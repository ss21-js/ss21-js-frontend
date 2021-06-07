import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RoundedBox from '../../components/RoundedBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faGitAlt } from '@fortawesome/free-brands-svg-icons/faGitAlt';
import TagBox from '../../components/TagBox';
import { css } from '@emotion/react';

export interface LanguageStat {
	name: string;
	count: number;
}
interface ProfileGithubProps {
	username: string;
	languages: LanguageStat[];
}

const ProfileGithub: React.FC<ProfileGithubProps> = ({ username, languages }) => {
	const fillLabels = 	languages.map((language) => language.name);
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
				display: false,
				position: 'left',
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

	const tags = [
		{ name: 'Python', color: '#ff6384' },
		{ name: 'TypeScript', color: '#36a2eb' },
		{ name: 'Dart', color: '#ffce56' },
		{ name: 'Flutter', color: '#4bc0c0' },
		{ name: 'JavaScript', color: '#9966ff' },
		{ name: 'Java', color: '#ff9f40' },
	];

	return (
		<Container>
			<Grid container justifyContent={'space-evenly'}>
				<Grid item lg={6} md={9} sm={8} xs={12}>
					<RoundedBox padding={3}
								css={css`
								width: 450px;
								`}
					>
						<Box marginTop={1} marginBottom={0.5}>
							<Typography variant="h6" textAlign='center'>Programming language usage in GitHub Repositories</Typography>
						</Box>
						<Box marginBottom={0}>
							<Doughnut data={data} type={Doughnut} options={option} />
						</Box>
					</RoundedBox>
				</Grid>
				<Grid item lg={3} md={3} sm={4} xs={12}>
					<RoundedBox padding={3}>
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
					<RoundedBox padding={3} marginTop={3}>
						<Box marginTop={1} marginBottom={0.5}>
							<Typography variant="h6">Skills</Typography>
						</Box>
						<Box marginBottom={2}>
							{tags && (
								<Grid container spacing={2} marginBottom={2} justifyContent={'space-evenly'}>
									{tags.map((tag, index) => (
										<Grid key={index} item>
											<TagBox content={tag.name} color={tag.color} />
										</Grid>
									))}
								</Grid>
							)}
						</Box>
					</RoundedBox>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ProfileGithub;
