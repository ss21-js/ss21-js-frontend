import Typography from '@material-ui/core/Typography';
import { stringToHslColor } from 'common/utils';
import RoundedBox from 'components/RoundedBox';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export interface LanguageStat {
	name: string;
	count: number;
}

export interface GithubLanguagesBoxProps {
	languages: LanguageStat[];
}

const GithubLanguagesBox: React.FC<GithubLanguagesBoxProps> = ({ languages }) => {
	const languageNames = languages.map((language) => language.name);
	const languageCounts = languages.map((language) => language.count);
	const languageColors = languages.map((language) => stringToHslColor(language.name));
	const languageBackgroundColors = languages.map((language) =>
		stringToHslColor(language.name, { saturation: '50%' })
	);

	const data = {
		labels: languageNames,
		datasets: [
			{
				label: 'Languages',
				data: languageCounts,
				backgroundColor: languageColors,
				borderColor: languageBackgroundColors,
				borderWidth: 1,
			},
		],
	};

	const option = {
		responsive: true,
		layout: {
			padding: 16,
		},
		plugins: {
			legend: {
				display: true,
				position: 'bottom',
				labels: {
					font: {
						lineHeight: 1,
						size: 12,
						weight: 400,
					},
					padding: 15,
					textAlign: 'left',
				},
			},
		},
	};

	return (
		<RoundedBox padding={3}>
			<Typography variant="h6" textAlign="center">
				GitHub Repositories
			</Typography>
			<Typography variant="subtitle2" textAlign="center">
				Verteilung der verwendeten Programmiersprachen
			</Typography>
			<Doughnut data={data} type={Doughnut} options={option} />
		</RoundedBox>
	);
};

export default GithubLanguagesBox;
