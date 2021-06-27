import { useRecoilValue } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import { CompaniesApi, CompaniesControllerAddStudentsRequestToRequestsRequest } from 'js-api-client';

const useAcceptStudent = () => {
	const config = useRecoilValue(authenticatedApiConfigurationSelector);

	if (config === null) {
		return null;
	}

	return (params: CompaniesControllerAddStudentsRequestToRequestsRequest) => {
		return new CompaniesApi(config).companiesControllerAddStudentsRequestToRequests(params);
	};
};

export default useAcceptStudent;
