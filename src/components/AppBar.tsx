import { makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import MuiAppBar from '@material-ui/core/AppBar/AppBar';
import Button from '@material-ui/core/Button/Button';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fromRoot, signOut, toggleDrawerOpen } from 'src/store';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		zIndex: theme.zIndex.drawer + 1,
		position: 'absolute',
	},
	navIconHide: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	title: {
		flexGrow: 1,
	},
}));

const AppBar: React.FC = () => {
	const classes = useStyles();
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	const dispatch = useDispatch();
	const user = useSelector(fromRoot.firebaseUser);

	const handleDrawerToggle = () => {
		dispatch(toggleDrawerOpen());
	};

	const handleLogout = () => {
		dispatch(signOut());
	};

	return (
		<MuiAppBar className={classes.root}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerToggle}
					className={classes.navIconHide}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" color="inherit" noWrap={isMobile} className={classes.title}>
					Studentenbörse
				</Typography>
				{user != null && (
					<>
						<Typography variant="body1" color="inherit">
							{user.email}
						</Typography>
						<Button color="inherit" onClick={handleLogout}>
							Logout
						</Button>
					</>
				)}
			</Toolbar>
		</MuiAppBar>
	);
};
export default AppBar;
