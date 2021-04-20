import { atom } from 'recoil';

export const globalLoading = atom({
	key: 'globalLoading',
	default: false,
});

export const drawerOpen = atom({
	key: 'drawerOpen',
	default: false,
});

export enum ThemeMode {
	LIGHT,
	DARK,
}
export const themeMode = atom<ThemeMode>({
	key: 'themeMode',
	default: ThemeMode.LIGHT,
});
