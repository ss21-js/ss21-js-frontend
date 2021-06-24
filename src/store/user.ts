import { getDownloadURL, ref } from 'firebase/storage';
import { firebaseStorage } from 'index';
import {
	AuthApi,
	CompaniesApi,
	Company,
	CompanyDto,
	Student,
	StudentsApi,
	UpdateStudentDto,
	UserResponse,
} from 'js-api-client';
import { atom, selector, selectorFamily, useRecoilValue } from 'recoil';
import { authenticatedApiConfiguration } from './api';

const userResponseQuery = selector<UserResponse | null>({
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

const userDataQuery = selector<Student | Company | null>({
	key: 'userDataQuery',
	get: async ({ get }) => {
		const userResponse = get(userResponseQuery);
		return userResponse?.userData ?? null;
	},
});

export enum UserType {
	STUDENT,
	COMPANY,
}

const userTypeQuery = selector<UserType | null>({
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

export const firebaseImage = selectorFamily<string | undefined, string>({
	key: 'firebaseImage',
	get: (file) => async () => {
		const fileRef = ref(firebaseStorage, file);
		return getDownloadURL(fileRef);
	},
});

export const currentUserAtom = atom<Company | Student | null>({
	key: 'currentUserAtom',
	default: userDataQuery,
});

export const currentUserTypeAtom = atom<UserType | null>({
	key: 'currentUserTypeAtom',
	default: userTypeQuery,
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

export const useUpdateStudent = () => {
	const config = useRecoilValue(authenticatedApiConfiguration);

	if (config == null) {
		return null;
	}

	return (updateStudentDto: UpdateStudentDto) => {
		return new StudentsApi(config).studentsControllerUpdateProfile({
			updateStudentDto,
		});
	};
};
