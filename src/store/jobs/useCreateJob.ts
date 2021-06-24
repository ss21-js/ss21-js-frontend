import { CompaniesApi, CreateJobDto } from 'js-api-client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import { jobSeachQueryKeyState } from './jobSearchQuery';

const useCreateJob = () => {
	const setJobSeachQueryKey = useSetRecoilState(jobSeachQueryKeyState);
	const configuration = useRecoilValue(authenticatedApiConfigurationSelector);

	if (configuration === null) {
		return null;
	}

	return async (createJobDto: CreateJobDto) => {
		return new CompaniesApi(configuration).companiesControllerCreateJob({ createJobDto }).then((job) => {
			setJobSeachQueryKey(new Date());
			return job;
		});

		// Invalidate search quer
	};
};

export default useCreateJob;
