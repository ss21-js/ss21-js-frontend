import { selector } from 'recoil';
import User from 'src/model/user';
import { currentUserId } from './auth';

export const currentUser = selector<User>({
	key: 'userInfo',
	get: async ({ get }) => {
		const id = get(currentUserId);

		if (id == null) {
			throw Error('User not found');
		}

		// TODO: Get user info from backend

		return {
			id: id,
			firstname: 'Max',
			lastname: 'Mustermann',
		};
	},
});
