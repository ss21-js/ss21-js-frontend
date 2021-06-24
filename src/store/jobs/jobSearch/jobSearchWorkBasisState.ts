import WorkBasis from 'models/workBasis';
import { atom } from 'recoil';

const jobSearchWorkBasisState = atom<WorkBasis>({
	key: 'jobSearchWorkBasisState',
	default: WorkBasis.NONE,
});

export default jobSearchWorkBasisState;
