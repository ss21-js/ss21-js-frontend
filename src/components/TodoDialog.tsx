import { joiResolver } from '@hookform/resolvers/joi';
import { Button, Dialog, DialogActions, DialogTitle, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Joi from 'joi';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store';

const useStyles = makeStyles({
	textField: {
		width: '80%',
		margin: 20,
	},
});

interface Props {
	open: boolean;
	onClose: () => void;
}

type TodoForm = {
	title: string;
	description: string;
};
const todoSchema = Joi.object({
	title: Joi.string().alphanum().min(3).max(30).required(),
	description: Joi.string().alphanum().max(200).required(),
});

const TodoDialog: React.FC<Props> = (props: Props) => {
	const { open, onClose } = props;

	const classes = useStyles();
	const dispatch = useDispatch();

	const { register, handleSubmit, errors } = useForm<TodoForm>({
		resolver: joiResolver(todoSchema),
	});

	const onSubmit = (data: TodoForm) => {
		dispatch(
			addTodo({
				title: data.title,
				description: data.description,
			})
		);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogTitle>Add a new TODO</DialogTitle>
				<TextField
					inputRef={register}
					className={classes.textField}
					multiline
					name="title"
					label="Title"
					error={errors.title?.message !== undefined}
					helperText={errors.title?.message}
				/>
				<TextField
					inputRef={register}
					className={classes.textField}
					multiline
					name="description"
					label="Description"
					error={errors.description?.message !== undefined}
					helperText={errors.description?.message}
				/>
				<DialogActions>
					<Button color="primary" type="submit">
						OK
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default TodoDialog;
