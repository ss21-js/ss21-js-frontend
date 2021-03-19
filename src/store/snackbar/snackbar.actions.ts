import { createAction } from 'deox';
import { SnackbarEvent } from './snackbar.model';

export const createSnackbar = createAction('[Snackbar] create', (resolve) => (event: SnackbarEvent) => {
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

	return resolve(event, { duration });
});
export const showSnackbar = createAction(
	'[Snackbar] show',
	(resolve) => (event: SnackbarEvent & { duration: number }) => resolve(event)
);
export const showSnackbarCompleted = createAction('[Snackbar] show completed');
export const dismissSnackbar = createAction('[Snackbar] dismiss');
export const dismissSnackbarCompleted = createAction('[Snackbar] dismiss completed');

export type SnackbarActions =
	| ReturnType<typeof createSnackbar>
	| ReturnType<typeof showSnackbar>
	| ReturnType<typeof showSnackbarCompleted>
	| ReturnType<typeof dismissSnackbar>
	| ReturnType<typeof dismissSnackbarCompleted>;
