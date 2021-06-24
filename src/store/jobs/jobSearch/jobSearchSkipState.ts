import { atom } from 'recoil';

const jobSearchSkipState = atom<number>({
	key: 'jobSearchSkipState',
	default: 0,
});

export default jobSearchSkipState;
