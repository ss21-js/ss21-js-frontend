import { atom } from 'recoil';

export interface CurrentFirebaseUser {
	id: string;
	idToken: string;
	email: string | null;
}

const currentFirebaseUserState = atom<CurrentFirebaseUser | null>({
	key: 'currentFirebaseUserState',
	default: null,
});

export default currentFirebaseUserState;
