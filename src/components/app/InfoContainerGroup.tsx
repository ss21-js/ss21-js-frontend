import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import Box, { BoxProps } from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export interface InfoContainerGroupItem {
	title: string;
	content: string;
}

type InfoContainerGroupProps = BoxProps & {
	items: InfoContainerGroupItem[];
};

const InfoContainerGroup: React.FC<InfoContainerGroupProps> = ({ items, ...boxProps }) => {
	const theme = useTheme();

	return (
		<Box
			css={css`
				border: solid ${theme.palette.divider} 1px;
				border-radius: 0.6rem;
				overflow: hidden;
				box-sizing: border-box;
			`}
			{...boxProps}
		>
			<Grid
				container
				css={css`
					margin: -1px;
					width: auto;
					& :last-child {
						border-right: none;
					}
				`}
			>
				{items.map((item) => (
					<Grid
						item
						xs
						paddingX={2}
						paddingY={1}
						css={css`
							border: solid ${theme.palette.divider} 1px;
						`}
					>
						<Typography
							css={css`
								margin: ${theme.spacing(1, 0, 1, 0)};
								min-width: 120px;
								opacity: 0.8;
							`}
						>
							{item.title}
						</Typography>
						<Typography
							css={css`
								font-weight: 500;
							`}
						>
							{item.content}
						</Typography>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default InfoContainerGroup;
