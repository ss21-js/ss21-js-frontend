import { CompaniesApi, CreateJobDto } from 'js-api-client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import { jobSearchQueryKeyState } from './jobSearchQuery';

const useCreateJob = () => {
	const setJobSeachQueryKey = useSetRecoilState(jobSearchQueryKeyState);
	const configuration = useRecoilValue(authenticatedApiConfigurationSelector);

	if (configuration === null) {
		return null;
	}

	return async (createJobDto: CreateJobDto) => {
		return new CompaniesApi(configuration).companiesControllerCreateJob({ createJobDto }).then((job) => {
			setJobSeachQueryKey(new Date());
			return job;
		});
	};
};

export default useCreateJob;
