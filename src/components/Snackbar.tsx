import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useTransition } from 'react-spring';
import { dismissSnackbar, dismissSnackbarCompleted, fromRoot, showSnackbarCompleted } from '../store';

const useStyles = makeStyles({
	root: {
		position: 'fixed',
		top: '72px',
		left: '50%',
		transform: 'translateX(-50%)',
		zIndex: 99999999,
	},
});

const Snackbar: React.FunctionComponent = () => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const snackbarState = useSelector(fromRoot.getSnackbar);
	const [snackbar, setSnackbar] = React.useState(snackbarState);

	React.useEffect(() => {
		setSnackbar(snackbarState);
	}, [snackbarState]);

	const onClose = (_: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		if (snackbar !== null) {
			dispatch(dismissSnackbar());
		}
	};

	const transitions = useTransition(snackbar, null, {
		from: {
			opacity: 0,
			transform: 'perspective(1px) translateY(-50%) scale(0.9)',
		},
		enter: {
			opacity: 1,
			transform: 'perspective(1px) translateY(0%) scale(1)',
		},
		leave: {
			opacity: 0,
			transform: 'perspective(1px) translateY(-50%) scale(0.9)',
		},
		onDestroyed: (hide) => dispatch(hide ? dismissSnackbarCompleted() : showSnackbarCompleted()),
	});

	return (
		<div className={classes.root}>
			{transitions.map(
				({ item, props, key }) =>
					item && (
						<animated.div key={key} style={props}>
							<Alert
								onClose={onClose}
								severity={item.severity}
								variant={item.severity === 'info' ? 'standard' : 'filled'}
								style={{ zIndex: 9999999 }}
							>
								{item.message}
							</Alert>
						</animated.div>
					)
			)}
		</div>
	);
};
export default Snackbar;
