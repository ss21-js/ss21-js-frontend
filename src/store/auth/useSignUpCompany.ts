import { AuthApi, CompanyDto } from 'js-api-client';
import UserType from 'models/userType';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import currentUserState from 'store/user/currentUserState';
import currentUserTypeState from 'store/user/currentUserTypeState';

export const useSignUpCompany = () => {
	const config = useRecoilValue(authenticatedApiConfigurationSelector);
	const setCurrentUser = useSetRecoilState(currentUserState);
	const setCurrentUserType = useSetRecoilState(currentUserTypeState);

	if (config == null) {
		return null;
	}

	return async (companyDto: CompanyDto): Promise<boolean> => {
		try {
			const response = await new AuthApi(config).companiesControllerSignup({ companyDto });
			setCurrentUser(response);
			setCurrentUserType(UserType.COMPANY);
			return true;
		} catch (e) {
			return false;
		}
	};
};
