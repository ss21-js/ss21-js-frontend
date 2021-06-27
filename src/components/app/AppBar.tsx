import { css } from '@emotion/react';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MuiAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles';
import styled from '@material-ui/core/styles/styled';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useRecoilState } from 'recoil';
import signOut from 'store/auth/signOut';
import drawerOpenState from 'store/general/drawerOpenState';
import CurrentUser from '../CurrentUser';
import Logo from '../Logo';
import Navigation from './Navigation';

const StyledAppBar = styled(MuiAppBar)`
	background-color: ${(props) => props.theme.palette.background.paper};
	border-bottom: 1px solid ${(props) => props.theme.palette.divider};
`;

const StyledToolbar = styled(Toolbar)`
	display: flex;
	justify-content: space-between;
`;

const LogoContainer = styled('div')`
	${(props) => props.theme.breakpoints.down('md')} {
		width: 250px;
	}
`;

const UserContainer = styled('div')`
	display: flex;
	justify-content: flex-end;

	${(props) => props.theme.breakpoints.down('md')} {
		width: 250px;
	}
`;

const AppBar = () => {
	const [isDrawerOpen, setDrawerOpen] = useRecoilState(drawerOpenState);

	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const handleMenuToggle = () => setDrawerOpen(!isDrawerOpen);
	const handleSignOut = () => signOut();

	return (
		<StyledAppBar position="fixed" elevation={0}>
			<StyledToolbar>
				{isMobile && (
					<IconButton color="primary" aria-label="open menu" onClick={handleMenuToggle}>
						<FontAwesomeIcon icon={faBars} />
					</IconButton>
				)}
				<LogoContainer>
					<Logo />
				</LogoContainer>
				{!isMobile && <Navigation />}
				<UserContainer>
					<CurrentUser avatarOnly={isMobile} />
					<Tooltip title="Ausloggen">
						<span>
							<IconButton
								aria-label="delete"
								css={css`
									margin-left: 0.75rem;
								`}
								onClick={handleSignOut}
							>
								<FontAwesomeIcon icon={faSignOutAlt} />
							</IconButton>
						</span>
					</Tooltip>
				</UserContainer>
			</StyledToolbar>
		</StyledAppBar>
	);
};
export default AppBar;
