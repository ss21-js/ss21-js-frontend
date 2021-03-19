import type { Todo, TodosState } from './todo.model';

export const getAllTodos = (state: TodosState): Todo[] => state.allIds.map((id) => state.byId[id]);

export const getUncompletedTodos = (state: TodosState): Todo[] =>
	state.allIds.map((id) => state.byId[id]).filter((t) => !t.isCompleted);
