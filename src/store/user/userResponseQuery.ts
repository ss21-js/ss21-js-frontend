import { AuthApi, UserResponse } from 'js-api-client';
import { selector } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';

const userResponseQuery = selector<UserResponse | null>({
	key: 'userResponseQuery',
	get: async ({ get }) => {
		const config = get(authenticatedApiConfigurationSelector);

		if (config == null) {
			return null;
		}

		return new AuthApi(config)
			.appControllerGetOwnProfile()
			.then((response) => response)
			.catch(() => null);
	},
});

export default userResponseQuery;
