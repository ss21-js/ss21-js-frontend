import { useRecoilValue, useSetRecoilState } from 'recoil';
import { savedJobsQueryKeyState } from 'store/jobs/jobsSavedQuery';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import { StudentsApi } from 'js-api-client';

const useToggleSaveJob = () => {
	const config = useRecoilValue(authenticatedApiConfigurationSelector);
	const setSavedJobsQueryKeyState = useSetRecoilState(savedJobsQueryKeyState);

	if (config == null) {
		return null;
	}

	return (jobId: string) => {
		return new StudentsApi(config)
			.studentsControllerToggleSavedJobs({
				jobId,
			})
			.then(() => {
				// Invalidate cache
				setSavedJobsQueryKeyState(new Date());
			});
	};
};

export default useToggleSaveJob;
