import WorkArea from 'models/workArea';
import { atom } from 'recoil';

const jobSearchWorkAreaState = atom<WorkArea>({
	key: 'jobSearchWorkAreaState',
	default: WorkArea.NONE,
});

export default jobSearchWorkAreaState;
