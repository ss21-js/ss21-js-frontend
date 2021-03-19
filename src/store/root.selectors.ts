import * as fromConfig from './config/config.selectors';
import { RootState } from './root.reducer';
import { SnackbarState } from './snackbar/snackbar.model';
import { Todo } from './todo/todo.model';
import * as fromTodo from './todo/todo.selectors';

export const isDrawerOpen = (state: RootState): boolean => fromConfig.isDrawerOpen(state.config);

export const getAllTodos = (state: RootState): Todo[] => fromTodo.getAllTodos(state.todo);
export const getUncompletedTodos = (state: RootState): Todo[] => fromTodo.getUncompletedTodos(state.todo);

export const getSnackbar = (state: RootState): SnackbarState => state.snackbar;
