import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

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

const { persistAtom } = recoilPersist();

export const themeModeAtom = atom<ThemeMode>({
	key: 'themeMode',
	default: ThemeMode.LIGHT,
	effects_UNSTABLE: [persistAtom],
});
