import { Company, Student } from 'js-api-client';
import { selector } from 'recoil';
import userResponseQuery from './userResponseQuery';

const userDataQuery = selector<Student | Company | null>({
	key: 'userDataQuery',
	get: async ({ get }) => {
		const userResponse = get(userResponseQuery);
		return userResponse?.userData ?? null;
	},
});

export default userDataQuery;
