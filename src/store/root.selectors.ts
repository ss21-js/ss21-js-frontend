import firebase from 'firebase';
import * as fromAuth from './auth/auth.selectors';
import * as fromConfig from './config/config.selectors';
import { RootState } from './root.reducer';
import { SnackbarState } from './snackbar/snackbar.model';
import { Todo } from './todo/todo.model';
import * as fromTodo from './todo/todo.selectors';

export const firebaseUser = (state: RootState): firebase.User | null => fromAuth.firebaseUser(state.auth);
export const isLoading = (state: RootState): boolean => fromAuth.isLoading(state.auth);

export const isDrawerOpen = (state: RootState): boolean => fromConfig.isDrawerOpen(state.config);

export const getAllTodos = (state: RootState): Todo[] => fromTodo.getAllTodos(state.todo);
export const getUncompletedTodos = (state: RootState): Todo[] => fromTodo.getUncompletedTodos(state.todo);

export const getSnackbar = (state: RootState): SnackbarState => state.snackbar;
