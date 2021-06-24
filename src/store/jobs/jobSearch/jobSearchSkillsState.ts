import { atom } from 'recoil';

const jobSearchSkillsState = atom<string[]>({
	key: 'jobSearchSkillsState',
	default: [],
});
export default jobSearchSkillsState;
