import { atom } from 'recoil';

const globalLoadingState = atom({
	key: 'globalLoadingState',
	default: false,
});

export default globalLoadingState;
