import { css } from '@emotion/react';
import { Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';
import UndrawFeelingProud from '../../assets/undraw_feeling_proud.svg';

const LandingImage: React.FC = () => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	return (
		<img
			css={
				isMobile
					? css`
							max-width: min(60vw, 400px);
							margin-bottom: min(5vh, 64px);
					  `
					: css`
							margin-right: 3vw;
							max-width: 40vw;
					  `
			}
			src={UndrawFeelingProud}
			alt=""
		/>
	);
};

export default LandingImage;
