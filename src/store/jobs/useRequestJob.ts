import { useRecoilValue } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import { StudentsApi } from 'js-api-client';

const useRequestJob = () => {
	const config = useRecoilValue(authenticatedApiConfigurationSelector);

	if (config === null) {
		return null;
	}

	return (jobId: string) => {
		return new StudentsApi(config).studentsControllerRequestJob({ jobId });
	};
};

export default useRequestJob;
