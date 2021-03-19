import {
	Badge,
	Divider,
	Drawer as DrawerMui,
	Hidden,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Theme,
} from '@material-ui/core';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import HomeIcon from '@material-ui/icons/Home';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useRoutesActive } from 'react-typesafe-routes';
import router from '../router';
import { fromRoot, setDrawerOpen } from '../store';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	drawerHeader: { ...theme.mixins.toolbar },
	drawerPaper: {
		width: 250,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up('md')]: {
			width: drawerWidth,
			position: 'relative',
			height: '100%',
		},
	},
}));

const TodoIcon = () => {
	const uncompletedTodos = useSelector(fromRoot.getUncompletedTodos);

	if (uncompletedTodos.length > 0) {
		return (
			<Badge color="secondary" badgeContent={uncompletedTodos.length}>
				<FormatListNumberedIcon />
			</Badge>
		);
	}
	return <FormatListNumberedIcon />;
};

function Content() {
	const classes = useStyles();
	const history = useHistory();

	const { home, todo } = useRoutesActive({
		home: router.home,
		todo: router.todo,
	});

	return (
		<div>
			<div className={classes.drawerHeader} />
			<Divider />
			<List>
				<ListItem button onClick={() => history.push(router.home().$)} selected={home}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button onClick={() => history.push(router.todo().$)} selected={todo}>
					<ListItemIcon>
						<TodoIcon />
					</ListItemIcon>
					<ListItemText primary="Todo" />
				</ListItem>
			</List>
		</div>
	);
}

const Drawer: React.FC = () => {
	const classes = useStyles();
	const drawerOpen: boolean = useSelector(fromRoot.isDrawerOpen);
	const dispatch = useDispatch();

	const handleDrawerToggle = () => {
		dispatch(setDrawerOpen(!drawerOpen));
	};

	return (
		<>
			<Hidden mdUp>
				<DrawerMui
					variant="temporary"
					anchor="left"
					open={drawerOpen}
					classes={{
						paper: classes.drawerPaper,
					}}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<Content />
				</DrawerMui>
			</Hidden>
			<Hidden smDown>
				<DrawerMui
					variant="permanent"
					open
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<Content />
				</DrawerMui>
			</Hidden>
		</>
	);
};
export default Drawer;
