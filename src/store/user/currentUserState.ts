import { Company, Student } from 'js-api-client';
import { atom } from 'recoil';
import userDataQuery from './userDataQuery';

const currentUserState = atom<Company | Student | null>({
	key: 'currentUserState',
	default: userDataQuery,
});

export default currentUserState;
