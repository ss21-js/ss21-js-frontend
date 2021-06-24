import { atom } from 'recoil';

const jobSearchLimitState = atom<number>({
	key: 'jobSearchLimitState',
	default: 50,
});

export default jobSearchLimitState;
