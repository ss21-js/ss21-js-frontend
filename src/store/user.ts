import { AuthApi, UserResponse } from 'js-api-client';
import { selector } from 'recoil';
import { authenticatedApiConfiguration } from './api';

export const currentUser = selector<UserResponse | null>({
	key: 'userInfo',
	get: async ({ get }) => {
		const config = get(authenticatedApiConfiguration);

		if (config == null) {
			return null;
		}

		return new AuthApi(config)
			.appControllerGetOwnProfile()
			.then((response) => response)
			.catch(() => null);
	},
});
