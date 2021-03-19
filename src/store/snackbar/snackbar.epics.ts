import { ofType } from 'deox';
import { combineEpics, Epic } from 'redux-observable';
import { asyncScheduler, merge, of } from 'rxjs';
import { debounceTime, delay, delayWhen, mapTo, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { fromRoot, RootState } from '..';
import {
	createSnackbar,
	dismissSnackbar,
	dismissSnackbarCompleted,
	showSnackbar,
	showSnackbarCompleted,
	SnackbarActions,
} from './snackbar.actions';

const showSnackbarEpic: Epic<SnackbarActions, SnackbarActions, RootState> = (action$, state$) =>
	action$.pipe(
		ofType(createSnackbar),
		debounceTime(100, asyncScheduler),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			const showAction = showSnackbar({ ...action.payload, ...action.meta });

			return fromRoot.getSnackbar(state)
				? action$.pipe(ofType(dismissSnackbarCompleted), take(1), mapTo(showAction))
				: of(showAction);
		})
	);

const dismissSnackbarEpic: Epic<SnackbarActions, SnackbarActions, RootState> = (action$) =>
	action$.pipe(
		ofType(showSnackbar),
		delayWhen(({ payload }) =>
			merge(
				action$.pipe(ofType(showSnackbarCompleted), take(1), delay(payload.duration, asyncScheduler)),
				action$.pipe(ofType(createSnackbar), take(1))
			)
		),
		mapTo(dismissSnackbar())
	);

const snackbarEpic = combineEpics(showSnackbarEpic, dismissSnackbarEpic);
export default snackbarEpic;
