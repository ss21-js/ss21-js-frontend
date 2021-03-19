import { ConfigActions } from './config/config.actions';
import { SnackbarActions } from './snackbar/snackbar.actions';
import { TodoActions } from './todo/todo.actions';

export type RootActions = TodoActions | SnackbarActions | ConfigActions;
