import { combineEpics } from 'redux-observable';
import snackbarEpic from './snackbar/snackbar.epics';
import todosEpic from './todo/todo.epics';

const rootEpic = combineEpics(snackbarEpic, todosEpic);

export default rootEpic;
