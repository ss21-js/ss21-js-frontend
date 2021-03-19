import { createReducer } from 'deox';
import { omitBy } from 'lodash';
import { addTodo, editTodo, removeFinishedTodos, removeTodo } from './todo.actions';
import { TodosState } from './todo.model';

const initialState: TodosState = {
	byId: {},
	allIds: [],
};

const todosReducer = createReducer(initialState, (handleAction) => [
	handleAction(addTodo, (state, { payload }) => ({
		byId: { ...state.byId, [payload.id]: payload },
		allIds: [...state.allIds, payload.id],
	})),
	handleAction(removeTodo, (state, { payload }) => {
		const byId = { ...state.byId };
		delete byId[payload];

		return {
			byId,
			allIds: Object.keys(byId),
		};
	}),
	handleAction(editTodo, (state, { payload }) => {
		return {
			byId: { ...state.byId, [payload.id]: payload },
			allIds: state.allIds,
		};
	}),
	handleAction(removeFinishedTodos, (state) => {
		const byId = omitBy(state.byId, (t) => t.isCompleted);

		return {
			byId,
			allIds: Object.keys(byId),
		};
	}),
]);
export default todosReducer;
