import { Button, Grid, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import TodoDialog from '../components/TodoDialog';
import TodoTable from '../components/TodoTable';
import { removeFinishedTodos } from '../store';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: 20,
		[theme.breakpoints.down('md')]: {
			paddingTop: 50,
			paddingLeft: 15,
			paddingRight: 15,
		},
	},
	buttonContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginBottom: 15,
		marginLeft: 16,
	},
}));

const TodoPage: React.FC = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddTodo = () => {
		setOpen(true);
	};

	const handleDeleteCompletedTodos = () => {
		dispatch(removeFinishedTodos());
	};

	return (
		<Grid container className={classes.root}>
			<TodoDialog open={open} onClose={handleClose} />
			<Grid item xs={6}>
				<Typography variant="h4" gutterBottom>
					Todo List
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<div className={classes.buttonContainer}>
					<Button
						className={classes.button}
						variant="contained"
						color="secondary"
						onClick={handleDeleteCompletedTodos}
					>
						Delete completed todos
					</Button>
					<Button className={classes.button} variant="contained" color="secondary" onClick={handleAddTodo}>
						Add todo
					</Button>
				</div>
			</Grid>
			<Grid item xs={12}>
				<TodoTable />
			</Grid>
		</Grid>
	);
};
export default TodoPage;
