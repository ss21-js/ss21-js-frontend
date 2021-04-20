import { css } from '@emotion/react';
import { Theme, useMediaQuery } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import LandingCallToAction from 'src/components/landing/LandingCallToAction';
import LandingImage from 'src/components/landing/LandingImage';
import Logo from 'src/components/Logo';
import StyledButton from 'src/components/StyledButton';
import router from 'src/Router';
import { currentUserId } from 'src/store/auth';

const LandingPage: React.FC = () => {
	const history = useHistory();

	const userId = useRecoilValue(currentUserId);
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const handleToApp = () => history.push(router.app().search().$);
	const handleLogin = () => history.push(router.login().$);
	const handleRegister = () => history.push(router.register().$);

	return (
		<Box paddingX={isMobile ? 3 : 6} paddingY={isMobile ? 2 : 4} width="100%">
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Logo large={!isMobile} />
				<StyledButton
					variant="text"
					css={css`
						font-size: ${isMobile ? 1 : 1.5}rem;
					`}
					onClick={userId ? handleToApp : handleLogin}
				>
					{userId ? 'To App' : 'Login'}
				</StyledButton>
			</Box>
			<div
				css={css`
					display: flex;
					flex-direction: ${isMobile ? 'column' : 'row'};
					justify-content: ${isMobile ? 'center' : 'space-between'};
					align-items: center;
					min-height: max(calc(100% - ${isMobile ? 48 : 64}px), ${isMobile ? 450 : 600}px);
				`}
			>
				{isMobile ? (
					<>
						<LandingImage />
						<LandingCallToAction onRegister={handleRegister} />
					</>
				) : (
					<>
						<LandingCallToAction onRegister={handleRegister} />
						<LandingImage />
					</>
				)}
			</div>
		</Box>
	);
};

export default LandingPage;
