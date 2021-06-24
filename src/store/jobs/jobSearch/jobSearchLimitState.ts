import { atom } from 'recoil';

const jobSearchLimitState = atom<number>({
	key: 'jobSearchLimitState',
	default: 0,
});

export default jobSearchLimitState;
