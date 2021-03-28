import firebase from 'firebase';
import { AuthState } from './auth.model';

export const firebaseUser = (state: AuthState): firebase.User | null => state.firebaseUser;

export const isLoading = (state: AuthState): boolean => state.loading;
