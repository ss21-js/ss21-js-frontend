import { ofType } from 'deox';
import { combineEpics, Epic } from 'redux-observable';
import { map } from 'rxjs/operators';
import { RootState } from '..';
import { RootActions } from '../root.actions';
import { createSnackbar } from '../snackbar/snackbar.actions';
import { addTodo } from './todo.actions';

const createTodoEpic: Epic<RootActions, RootActions, RootState> = (action$) =>
	action$.pipe(
		ofType(addTodo),
		map(() => createSnackbar({ message: 'Todo created', severity: 'info' }))
	);

const todosEpic = combineEpics(createTodoEpic);
export default todosEpic;
