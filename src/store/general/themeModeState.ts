import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export enum ThemeMode {
	LIGHT,
	DARK,
}

const { persistAtom } = recoilPersist();

const themeModeState = atom<ThemeMode>({
	key: 'themeModeState',
	default: window.matchMedia('(prefers-color-scheme: dark)') ? ThemeMode.DARK : ThemeMode.LIGHT,
	effects_UNSTABLE: [persistAtom],
});

export default themeModeState;
