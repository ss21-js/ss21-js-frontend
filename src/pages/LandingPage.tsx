import { css } from '@emotion/react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Logo from 'src/components/Logo';
import StyledButton from 'src/components/StyledButton';
import router from 'src/Router';
import { currentUserId } from 'src/store/auth';
import UndrawFeelingProud from '../assets/undraw_feeling_proud.svg';

const LandingPage: React.FC = () => {
	const history = useHistory();

	const userId = useRecoilValue(currentUserId);

	const handleToApp = () => history.push(router.app().search().$);

	const handleLogin = () => history.push(router.login().$);

	const handleRegister = () => history.push(router.register().$);

	return (
		<Box paddingX={6} paddingY={4} width="100%">
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Logo large />
				<StyledButton
					variant="text"
					css={css`
						font-size: 1.5rem;
					`}
					onClick={userId ? handleToApp : handleLogin}
				>
					{userId ? 'To App' : 'Login'}
				</StyledButton>
			</Box>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<div
					css={css`
						margin: 30vh 0 25vh 3vw;
						width: 30vw;
					`}
				>
					<Typography variant="h5" color="primary" fontWeight={500} gutterBottom>
						GET STARTED
					</Typography>
					<Typography variant="h3" lineHeight="1.45">
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
							font-size: 1.5rem;
						`}
						onClick={handleRegister}
					>
						Create your free Account
					</StyledButton>
				</div>
				<img
					css={css`
						margin-right: 3vw;
						max-width: 40vw;
					`}
					src={UndrawFeelingProud}
				/>
			</Box>
		</Box>
	);
};

export default LandingPage;
