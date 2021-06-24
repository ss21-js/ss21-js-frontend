import { apiBasePath } from 'common/config';
import { Configuration } from 'js-api-client';
import { selector } from 'recoil';
import currentFirebaseUserState from 'store/auth/currentFirebaseUserState';

const authenticatedApiConfigurationSelector = selector<Configuration | null>({
	key: 'authenticatedApiConfiguration',
	get: async ({ get }) => {
		const currentFirebaseUser = get(currentFirebaseUserState);

		if (currentFirebaseUser == null) {
			return null;
		}

		return new Configuration({
			basePath: apiBasePath,
			accessToken: currentFirebaseUser.idToken,
		});
	},
});

export default authenticatedApiConfigurationSelector;
