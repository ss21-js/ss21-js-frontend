import firebase from 'firebase';
import * as fromAuth from './auth/auth.selectors';
import * as fromConfig from './config/config.selectors';
import { RootState } from './root.reducer';
import { SnackbarState } from './snackbar/snackbar.model';

export const firebaseUser = (state: RootState): firebase.User | null => fromAuth.firebaseUser(state.auth);
export const authLoading = (state: RootState): boolean => fromAuth.isLoading(state.auth);
export const authError = (state: RootState): string | null => fromAuth.error(state.auth);

export const isDrawerOpen = (state: RootState): boolean => fromConfig.isDrawerOpen(state.config);

export const getSnackbar = (state: RootState): SnackbarState => state.snackbar;
