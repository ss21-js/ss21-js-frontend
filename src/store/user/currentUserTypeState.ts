import UserType from 'models/userType';
import { atom } from 'recoil';
import userTypeQuery from './userTypeQuery';

const currentUserTypeState = atom<UserType | null>({
	key: 'currentUserTypeAtom',
	default: userTypeQuery,
});

export default currentUserTypeState;
