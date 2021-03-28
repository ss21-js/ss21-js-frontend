import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

const useStyles = makeStyles({
	root: {
		height: '100%',
		textAlign: 'center',
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
	},
});

const HomePage: React.FC = () => {
	const classes = useStyles();

	return <div className={classes.root}>Home</div>;
};
export default HomePage;
