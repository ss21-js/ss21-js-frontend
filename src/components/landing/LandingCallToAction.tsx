import { css } from '@emotion/react';
import { Theme, useMediaQuery } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import StyledButton from '../StyledButton';

export interface LandingCallToActionProps {
	onRegister: () => void;
}

const LandingCallToAction: React.FC<LandingCallToActionProps> = ({ onRegister }) => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	return (
		<div
			css={
				isMobile
					? css`
							flex: 0 1 auto;
					  `
					: css`
							margin: auto 0 auto 3vw;
							flex: 1 0 max(30vw, 500px);
					  `
			}
		>
			<Typography component="h2" variant={isMobile ? 'h6' : 'h5'} color="primary" fontWeight={500} gutterBottom>
				GET STARTED
			</Typography>
			<Typography component="h2" variant={isMobile ? 'h5' : 'h3'} lineHeight="1.45">
				<b>Hire</b> or <b>Get Hired</b> on the best{' '}
				<span
					css={css`
						text-decoration: line-through;
					`}
				>
					Ninja
				</span>{' '}
				Student Job Exchange!
			</Typography>
			<StyledButton
				css={css`
					margin-top: 1rem;
					height: 3rem;
					padding: 2rem 3rem;
					font-size: ${isMobile ? 1.25 : 1.5}rem;
				`}
				onClick={onRegister}
			>
				Create your free Account
			</StyledButton>
		</div>
	);
};

export default LandingCallToAction;
