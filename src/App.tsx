import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { RouterSwitch, useRouteOptions } from 'react-typesafe-routes';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import Snackbar from './components/Snackbar';
import router from './Router';

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

	const { showDrawer, showAppBar } = useRouteOptions(router);

	return (
		<div className={classes.root}>
			<div className={classes.appFrame}>
				<Snackbar />
				{showAppBar && <AppBar />}
				{showDrawer && <Drawer />}
				<div className={classes.content}>
					<RouterSwitch router={router} />
				</div>
			</div>
		</div>
	);
};

export default App;
