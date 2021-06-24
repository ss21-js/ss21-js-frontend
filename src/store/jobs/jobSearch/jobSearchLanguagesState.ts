import { atom } from 'recoil';

const jobSearchLanguagesState = atom<string[]>({
	key: 'jobSearchLanguagesState',
	default: [],
});

export default jobSearchLanguagesState;
