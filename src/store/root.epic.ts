import { combineEpics } from 'redux-observable';
import authEpics from './auth/auth.epics';
import snackbarEpic from './snackbar/snackbar.epics';

const rootEpic = combineEpics(snackbarEpic, authEpics);

export default rootEpic;
