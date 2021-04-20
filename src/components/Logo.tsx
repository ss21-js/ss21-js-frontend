import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import logo from 'src/assets/logo.svg';

export interface LogoProps {
	hideText?: boolean;
	large?: boolean;
}

const Logo: React.FC<LogoProps> = ({ hideText, large }) => {
	const theme = useTheme();

	const size = large ? 64 : 48;

	return (
		<div
			css={css`
				display: flex;
				flex-direction: row;
			`}
		>
			<img src={logo} width={`${size}px`} height={`${size}px`} />
			<Typography
				component="h1"
				variant={large ? 'h4' : 'h6'}
				color={theme.palette.primary.dark}
				css={css`
					display: ${!hideText ? 'block' : 'none'};
					margin: auto 0;
					padding-left: ${large ? 0.75 : 0.5}rem;
				`}
				noWrap
			>
				Job Ninja
			</Typography>
		</div>
	);
};

export default Logo;
