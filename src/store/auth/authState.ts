import { atom } from 'recoil';

export interface AuthState {
	loading: boolean;
	error: string | null;
}

const authState = atom<AuthState>({
	key: 'authState',
	default: {
		loading: false,
		error: null,
	},
});

export default authState;
