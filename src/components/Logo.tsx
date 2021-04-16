import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import logo from 'src/assets/logo.svg';

export interface LogoProps {
	hideText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ hideText }) => {
	const theme = useTheme();

	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
			`}
		>
			<img src={logo} width="48px" height="48px" />
			<Typography
				component="h1"
				variant="h6"
				color={theme.palette.primary.dark}
				css={css`
					display: ${!hideText ? 'block' : 'none'};
					margin: auto 0;
					padding-left: 0.5rem;
				`}
				noWrap
			>
				Job Ninja
			</Typography>
		</div>
	);
};

export default Logo;
