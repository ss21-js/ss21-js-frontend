import { ofType } from 'deox';
import firebase from 'firebase';
import { combineEpics, Epic } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { RootActions, RootState } from '..';
import { logout, setFirebaseUser } from './auth.actions';

const logoutEpic: Epic<RootActions, RootActions, RootState> = (action$) =>
	action$.pipe(
		ofType(logout),
		mergeMap(async () => {
			await firebase.auth().signOut();
			return setFirebaseUser(null);
		})
	);

const authEpics = combineEpics(logoutEpic);

export default authEpics;
