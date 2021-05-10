import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Container from '@material-ui/core/Container/Container';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core';
import { css } from '@emotion/react';

export interface InfoContainerGroupItem {
	titel: string;
	content: string;
}

interface InfoContainerGroupProps {
	items: InfoContainerGroupItem[];
}

const InfoContainerGroup: React.FC<InfoContainerGroupProps> = ({ items }) => {
	const theme = useTheme();

	return (
		<Container
			css={css`
				margin: ${theme.spacing(0, 15, 0, 15)};
				align-self: center;
				border: solid gray 1px;
				border-radius: 0.6rem;
			`}
		>
			<>
				<Grid container justifyContent="space-evenly">
					{items.map((item) => (
						<Grid item>
							<Typography
								css={css`
									margin: ${theme.spacing(1, 0, 1, 0)};
									min-width: 120px;
								`}
							>
								{item.titel}
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
			</>
		</Container>
	);
};

export default InfoContainerGroup;
