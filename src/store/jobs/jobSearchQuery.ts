import { JobsApi, JobWithCompany } from 'js-api-client';
import { atom, selector } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import jobSearchParameters from 'store/jobs/jobSearchParameters';

export const jobSeachQueryKeyState = atom({
	key: 'jobSeachKeyState',
	default: new Date(),
});

const jobSearchQuery = selector<JobWithCompany[] | null>({
	key: 'jobSearchJobs',
	get: async ({ get }) => {
		get(jobSeachQueryKeyState);

		const config = get(authenticatedApiConfigurationSelector);

		const parameters = get(jobSearchParameters);

		if (config == null) {
			return null;
		}
		new Promise((r) => setTimeout(r, 2000));

		return await new JobsApi(config)
			.jobsControllerSearchJobs({
				searchJobDto: parameters,
			})
			.catch(() => null);
	},
});

export default jobSearchQuery;
