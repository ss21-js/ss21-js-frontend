import { Configuration } from 'js-api-client';
import { selector } from 'recoil';
import { apiBasePath } from '../common/config';
import { currentFirebaseUser } from './auth';

export const authenticatedApiConfiguration = selector<Configuration | null>({
	key: 'authenticatedApiConfiguration',
	get: async ({ get }) => {
		const firebaseUser = get(currentFirebaseUser);

		if (firebaseUser == null) {
			return null;
		}

		return new Configuration({
			basePath: apiBasePath,
			accessToken: firebaseUser.idToken,
		});
	},
});
