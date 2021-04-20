import { atom } from 'recoil';

export const globalLoading = atom({
	key: 'globalLoading',
	default: false,
});

export const drawerOpen = atom({
	key: 'drawerOpen',
	default: false,
});
