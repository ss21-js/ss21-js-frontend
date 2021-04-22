import { css } from '@emotion/react';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import RoundedBox from './RoundedBox';
import RoundedImage from './RoundedImage';
import TagBox from './TagBox';

export interface JobCardProps {
	image: string;
	title: string;
	description: string;
	tags?: string[];
	onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ image, title, description, tags, onClick }) => {
	return (
		<Button
			css={css`
				text-transform: inherit;
				color: inherit;
				text-align: inherit;
				padding: 0;
			`}
			onClick={onClick}
		>
			<RoundedBox padding={3}>
				<RoundedImage src={image} width="72px" height="72px" />
				<Box marginTop={1} marginBottom={0.5}>
					<Typography variant="h6">{title}</Typography>
				</Box>
				<Box marginBottom={2}>
					<Typography variant="body1" component="p">
						{description}
					</Typography>
				</Box>
				{tags && (
					<Grid container spacing={2} marginBottom={2}>
						{tags.map((tag, index) => (
							<Grid key={index} item>
								<TagBox content={tag} />
							</Grid>
						))}
					</Grid>
				)}
			</RoundedBox>
		</Button>
	);
};

export default JobCard;
