import { combineEpics } from 'redux-observable';
import authEpics from './auth/auth.epics';
import snackbarEpic from './snackbar/snackbar.epics';
import todosEpic from './todo/todo.epics';

const rootEpic = combineEpics(snackbarEpic, todosEpic, authEpics);

export default rootEpic;
