import { AuthApi, CompaniesApi, Company, CompanyDto, Student, UserResponse } from 'js-api-client';
import { atom, selector, useRecoilValue } from 'recoil';
import { authenticatedApiConfiguration } from './api';

export const userResponseQuery = selector<UserResponse | null>({
	key: 'userResponseQuery',
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

export const userDataQuery = selector<Student | Company | null>({
	key: 'userDataQuery',
	get: async ({ get }) => {
		const userResponse = get(userResponseQuery);
		console.log(userResponse);
		return userResponse?.userData ?? null;
	},
});

export enum UserType {
	STUDENT,
	COMPANY,
}

export const userTypeQuery = selector<UserType | null>({
	key: 'userTypeQuery',
	get: async ({ get }) => {
		const userResponse = get(userResponseQuery);
		const userType = userResponse?.userType;

		if (userType === undefined) {
			return null;
		}

		if (userType === 'company') {
			return UserType.COMPANY;
		}

		return UserType.STUDENT;
	},
});

export const currentUserAtom = atom<Company | Student | null>({
	key: 'currentUserAtom',
	default: userDataQuery,
});

export const useUpdateCompany = () => {
	const config = useRecoilValue(authenticatedApiConfiguration);

	if (config == null) {
		return null;
	}

	return (company: CompanyDto) => {
		return new CompaniesApi(config).companiesControllerUpdateProfile({
			companyDto: company,
		});
	};
};
