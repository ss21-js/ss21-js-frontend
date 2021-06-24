import { atom } from 'recoil';

const jobSearchFromState = atom<Date>({
	key: 'jobSearchFromState',
	default: new Date(),
});

export default jobSearchFromState;
