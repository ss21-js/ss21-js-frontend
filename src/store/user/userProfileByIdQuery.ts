import { Company, CompanyFromJSON, GlobalApi, Student, StudentFromJSON } from 'js-api-client';
import UserType from 'models/userType';
import { selectorFamily } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';

interface UserProfile {
	data: Student | Company;
	type: UserType;
}

const userProfileByIdQuery = selectorFamily<UserProfile | null, string>({
	key: 'userProfileByIdQuery',
	get:
		(id) =>
		({ get }) => {
			const configuration = get(authenticatedApiConfigurationSelector);

			if (configuration === null) {
				return null;
			}

			return new GlobalApi(configuration)
				.appControllerGetUserByIdRaw({
					uid: id,
				})
				.then((res) => res.raw.text())
				.then((obj) => {
					const json = JSON.parse(obj);

					if (json['userType'] === 'student') {
						return {
							data: StudentFromJSON(json['userData']),
							type: UserType.STUDENT,
						};
					}

					return {
						data: CompanyFromJSON(json['userData']),
						type: UserType.COMPANY,
					};
				})
				.catch(() => null);
		},
});

export default userProfileByIdQuery;
