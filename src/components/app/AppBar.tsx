import { css } from '@emotion/react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Theme, useTheme } from '@material-ui/core';
import MuiAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { useRecoilState } from 'recoil';
import { drawerOpen } from 'src/store/general';
import CurrentUser from '../CurrentUser';
import Logo from '../Logo';
import StyledButton from '../StyledButton';

const Navigation = () => {
	const theme = useTheme();

	return (
		<div
			css={css`
				display: flex;
				justify-content: center;
			`}
		>
			<StyledButton
				variant="text"
				css={css`
					color: ${theme.palette.primary.light};
				`}
			>
				Find Job
			</StyledButton>
			<StyledButton
				variant="text"
				css={css`
					color: ${theme.palette.secondary.contrastText};
				`}
			>
				Saved
			</StyledButton>
			<StyledButton
				variant="text"
				css={css`
					color: ${theme.palette.secondary.contrastText};
				`}
			>
				Profile
			</StyledButton>
		</div>
	);
};

const AppBar = () => {
	const [isDrawerOpen, setDrawerOpen] = useRecoilState(drawerOpen);

	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const handleMenuToggle = () => setDrawerOpen(!isDrawerOpen);

	return (
		<MuiAppBar
			position="fixed"
			elevation={0}
			css={css`
				background-color: #fff;
			`}
		>
			<Toolbar
				css={css`
					display: flex;
					justify-content: space-between;
				`}
			>
				{isMobile && (
					<IconButton color="primary" aria-label="open menu" onClick={handleMenuToggle}>
						<FontAwesomeIcon icon={faBars} />
					</IconButton>
				)}
				<div
					css={css`
						${!isMobile && 'width: 200px;'}
					`}
				>
					<Logo />
				</div>
				{!isMobile && <Navigation />}
				<div
					css={css`
						display: flex;
						justify-content: flex-end;
						${!isMobile && 'width: 200px;'}
					`}
				>
					<CurrentUser avatarOnly={isMobile} />
				</div>
			</Toolbar>
		</MuiAppBar>
	);
};
export default AppBar;
