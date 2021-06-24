import { add } from 'date-fns';
import { atom } from 'recoil';

const jobSearchToState = atom<Date>({
	key: 'jobSearchToState',
	default: add(new Date(), { months: 3 }),
});

export default jobSearchToState;
