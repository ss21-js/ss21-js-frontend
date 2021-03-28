import firebase from 'firebase';
import { combineEpics, Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction, RootState } from '..';
import { setAuthError, setFirebaseUser, signIn, signInWith, signOut } from './auth.actions';
import { OAuthProvider } from './auth.model';

const signOutEpic: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(
		filter(isActionOf(signOut)),
		mergeMap(async () => {
			await firebase.auth().signOut();
			return setFirebaseUser(null);
		})
	);

const signInEpic: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(
		filter(isActionOf(signIn.request)),
		switchMap((action) =>
			from(firebase.auth().signInWithEmailAndPassword(action.payload.email, action.payload.password)).pipe(
				map(() => signIn.success()),
				catchError((err: firebase.auth.AuthError) => of(setAuthError(err.message)))
			)
		)
	);

const signInWithEpic: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(
		filter(isActionOf(signInWith.request)),
		switchMap((action) => {
			let provider: firebase.auth.AuthProvider;

			if (action.payload == OAuthProvider.google) {
				provider = new firebase.auth.GoogleAuthProvider();
			} else if (action.payload == OAuthProvider.apple) {
				const appleProvider = new firebase.auth.OAuthProvider('apple.com');

				appleProvider.addScope('email');
				appleProvider.addScope('name');

				provider = appleProvider;
			} else if (action.payload == OAuthProvider.microsoft) {
				const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com');

				microsoftProvider.addScope('mail.read');

				provider = microsoftProvider;
			} else if (action.payload == OAuthProvider.github) {
				provider = new firebase.auth.GithubAuthProvider();
			}

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return from(firebase.auth().signInWithPopup(provider!)).pipe(
				map(() => signInWith.success()),
				catchError((err: firebase.auth.AuthError) => of(setAuthError(err.message)))
			);
		})
	);

const authEpics = combineEpics(signOutEpic, signInEpic, signInWithEpic);
export default authEpics;
