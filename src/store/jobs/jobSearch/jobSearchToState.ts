import { add } from 'date-fns';
import { atom } from 'recoil';

const jobSearchToState = atom<Date>({
	key: 'jobSearchToState',
	default: add(new Date(), { months: 0 }),
});

export default jobSearchToState;
