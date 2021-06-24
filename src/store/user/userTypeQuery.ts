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

		return UserType[userType as keyof typeof UserType];
	},
});

export default userTypeQuery;
