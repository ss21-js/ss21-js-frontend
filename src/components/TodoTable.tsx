import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTodo, fromRoot, removeTodo } from '../store';
import { Todo } from '../store/todo/todo.model';

const useStyles = makeStyles({
	paper: {
		width: '100%',
		minWidth: 260,
		display: 'inline-block',
	},
	table: {
		width: '100%',
	},
});

const TodoTable: React.FC = () => {
	const classes = useStyles();
	const todoList = useSelector(fromRoot.getAllTodos);
	const dispatch = useDispatch();

	const onRowClick = (todo: Todo) => {
		dispatch(editTodo({ ...todo, isCompleted: !todo.isCompleted }));
	};

	return (
		<Paper className={classes.paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">Completed</TableCell>
						<TableCell padding="default">Titel</TableCell>
						<TableCell padding="default">Beschreibung</TableCell>
						<TableCell padding="default">Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{todoList.map((todo: Todo) => {
						return (
							<TableRow key={todo.id} hover>
								<TableCell padding="none">
									<Checkbox checked={todo.isCompleted} onClick={() => onRowClick(todo)} />
								</TableCell>
								<TableCell padding="none">{todo.title}</TableCell>
								<TableCell padding="none">{todo.description}</TableCell>
								<TableCell padding="none">
									<IconButton
										aria-label="Delete"
										color="default"
										onClick={() => dispatch(removeTodo(todo.id))}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
};
export default TodoTable;
