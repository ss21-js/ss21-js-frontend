import type { AuthActions } from './auth/auth.actions';
import type { ConfigActions } from './config/config.actions';
import type { SnackbarActions } from './snackbar/snackbar.actions';
import type { TodoActions } from './todo/todo.actions';

export * from './auth/auth.actions';
export * from './config/config.actions';
export * from './snackbar/snackbar.actions';
export * from './todo/todo.actions';

export type RootActions = TodoActions | SnackbarActions | ConfigActions | AuthActions;
