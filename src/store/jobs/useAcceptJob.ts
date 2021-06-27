import { useRecoilValue } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import { StudentsApi } from 'js-api-client';

const useConfirmJob = () => {
	const config = useRecoilValue(authenticatedApiConfigurationSelector);

	if (config === null) {
		return null;
	}

	return (jobId: string) => {
		return new StudentsApi(config).studentsControllerAcceptJob({ jobId });
	};
};

export default useConfirmJob;
