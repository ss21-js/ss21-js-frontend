import { createAction } from 'typesafe-actions';
import { SnackbarEvent } from './snackbar.model';

export const createSnackbar = createAction('CREATE_SNACKBAR', (event: SnackbarEvent) => {
	let { duration } = event;

	if (!duration) {
		switch (event.severity) {
			default:
			case 'success':
				duration = 3000;
				break;
			case 'info':
				duration = 5000;
				break;
			case 'error':
				duration = 8000;
				break;
		}
	}

	return { ...event, duration };
})();

export const showSnackbar = createAction('SHOW_SNACKBAR')<SnackbarEvent & { duration: number }>();
export const showSnackbarCompleted = createAction('SHOW_SNACKBAR_COMPLETES')();
export const dismissSnackbar = createAction('DISMISS_SNACKBAR')();
export const dismissSnackbarCompleted = createAction('DISMISS_SNACKBAR_COMPLETED')();
