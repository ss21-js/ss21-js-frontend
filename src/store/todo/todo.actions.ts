import { createAction } from 'deox';
import { Todo } from './todo.model';

export const addTodo = createAction(
	'[Todos] add',
	(resolve) => ({
		title,
		description,
		isCompleted = false,
	}: {
		title: string;
		description: string;
		isCompleted?: boolean;
	}) => resolve({ id: new Date().toISOString(), title, description, isCompleted } as Todo)
);
export const removeTodo = createAction('[Todos] remove', (resolve) => (id: string) => resolve(id));
export const editTodo = createAction('[Todos] edit', (resolve) => (todo: Todo) => resolve(todo));
export const removeFinishedTodos = createAction('[Todos] remove finished');

export type TodoActions =
	| ReturnType<typeof addTodo>
	| ReturnType<typeof removeTodo>
	| ReturnType<typeof editTodo>
	| ReturnType<typeof removeFinishedTodos>;
