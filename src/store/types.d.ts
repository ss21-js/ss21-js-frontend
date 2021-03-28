import { ActionType } from 'typesafe-actions';
import * as RootActions from './root.actions';

export type RootAction = ActionType<typeof RootActions>;

declare module 'typesafe-actions' {
	interface Types {
		RootAction: RootAction;
	}
}
