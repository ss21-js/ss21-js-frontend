import UserType from 'models/userType';
import { selector } from 'recoil';
import userResponseQuery from './userResponseQuery';

const userTypeQuery = selector<UserType | null>({
	key: 'userTypeQuery',
	get: async ({ get }) => {
		const userResponse = get(userResponseQuery);
		const userType = userResponse?.userType;

		if (userType === undefined) {
			return null;
		}

		if (userType === 'student') {
			return UserType.STUDENT;
		}

		return UserType.COMPANY;
	},
});

export default userTypeQuery;
