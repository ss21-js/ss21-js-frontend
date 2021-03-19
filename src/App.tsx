import { AppBar, IconButton, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RouterSwitch } from 'react-typesafe-routes';
import Drawer from './components/Drawer';
import Snackbar from './components/Snackbar';
import router from './router';
import { fromRoot, setDrawerOpen } from './store';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		height: '100%',
		zIndex: 1,
		overflow: 'hidden',
	},
	appFrame: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: '100%',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		position: 'absolute',
	},
	navIconHide: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	content: {
		backgroundColor: theme.palette.background.default,
		width: '100%',
		height: 'calc(100% - 56px)',
		marginTop: 56,
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100% - 64px)',
			marginTop: 64,
		},
	},
}));

const App: React.FC = () => {
	const classes = useStyles();
	const drawerOpen = useSelector(fromRoot.isDrawerOpen);
	const dispatch = useDispatch();
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	const handleDrawerToggle = () => {
		dispatch(setDrawerOpen(!drawerOpen));
	};

	return (
		<BrowserRouter>
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<Snackbar />
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerToggle}
								className={classes.navIconHide}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" noWrap={isMobile}>
								Create-React-App with Material-UI, Typescript, Redux and Routing
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer />
					<div className={classes.content}>
						<RouterSwitch router={router} />
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
