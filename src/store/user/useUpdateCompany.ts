import { CompaniesApi, CompanyDto } from 'js-api-client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import currentUserState from './currentUserState';

const useUpdateCompany = () => {
	const config = useRecoilValue(authenticatedApiConfigurationSelector);
	const setCurrentUser = useSetRecoilState(currentUserState);

	if (config == null) {
		return null;
	}

	return async (company: CompanyDto) => {
		const newCompany = await new CompaniesApi(config).companiesControllerUpdateProfile({
			companyDto: company,
		});
		setCurrentUser(newCompany);
	};
};

export default useUpdateCompany;
