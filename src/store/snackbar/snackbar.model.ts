export type SnackbarState = null | SnackbarEvent;

export interface SnackbarEvent {
	message: string;
	severity: 'error' | 'success' | 'info';
	technicalInfo?: unknown;
	duration?: number;
}
