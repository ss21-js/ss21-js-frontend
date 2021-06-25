import { css } from '@emotion/react';
import Box from '@material-ui/core/Box';
import { Theme } from '@material-ui/core/styles/createTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import LandingCallToAction from 'components/landing/LandingCallToAction';
import LandingImage from 'components/landing/LandingImage';
import Logo from 'components/Logo';
import StyledButton from 'components/StyledButton';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import router from 'Router';
import currentFirebaseUserState from 'store/auth/currentFirebaseUserState';

const LandingPage: React.FC = () => {
	const history = useHistory();

	const firebaseUser = useRecoilValue(currentFirebaseUserState);
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const handleToApp = () => history.push(router.app().jobs({}).$);
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
					onClick={firebaseUser ? handleToApp : handleLogin}
				>
					{firebaseUser ? 'To App' : 'Login'}
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
