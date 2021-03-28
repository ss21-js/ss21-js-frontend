import { combineEpics, Epic } from 'redux-observable';
import { asyncScheduler, merge, of } from 'rxjs';
import { debounceTime, delay, delayWhen, filter, mapTo, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { fromRoot, RootAction, RootState } from '..';
import {
	createSnackbar,
	dismissSnackbar,
	dismissSnackbarCompleted,
	showSnackbar,
	showSnackbarCompleted,
} from './snackbar.actions';

const showSnackbarEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
	action$.pipe(
		filter(isActionOf(createSnackbar)),
		debounceTime(100, asyncScheduler),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			const showAction = showSnackbar({ ...action.payload });

			return fromRoot.getSnackbar(state)
				? action$.pipe(filter(isActionOf(dismissSnackbarCompleted)), take(1), mapTo(showAction))
				: of(showAction);
		})
	);

const dismissSnackbarEpic: Epic<RootAction, RootAction, RootState> = (action$) =>
	action$.pipe(
		filter(isActionOf(showSnackbar)),
		delayWhen(({ payload }) =>
			merge(
				action$.pipe(
					filter(isActionOf(showSnackbarCompleted)),
					take(1),
					delay(payload.duration, asyncScheduler)
				),
				action$.pipe(filter(isActionOf(createSnackbar)), take(1))
			)
		),
		mapTo(dismissSnackbar())
	);

const snackbarEpic = combineEpics(showSnackbarEpic, dismissSnackbarEpic);
export default snackbarEpic;
