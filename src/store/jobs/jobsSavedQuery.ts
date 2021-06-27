import { atom, selector } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import { JobWithCompany, StudentsApi } from 'js-api-client';

export const savedJobsQueryKeyState = atom({
	key: 'savedJobsQueryKeyState',
	default: new Date(),
});

const savedJobsQuery = selector<JobWithCompany[] | null>({
	key: 'savedJobsQuery',
	get: ({ get }) => {
		get(savedJobsQueryKeyState);
		const config = get(authenticatedApiConfigurationSelector);

		if (config == null) {
			return null;
		}

		return new StudentsApi(config).studentsControllerGetSavedJobs();
	},
});

export default savedJobsQuery;
