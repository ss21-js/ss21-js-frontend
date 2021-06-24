import { atom } from 'recoil';

const jobSearchSearchStringState = atom<string>({
	key: 'jobSearchSearchStringState',
	default: '',
});

export default jobSearchSearchStringState;
