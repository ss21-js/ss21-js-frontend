import { JobsApi, JobWithCompany } from 'js-api-client';
import { atom, selectorFamily } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';

export const jobByIdQueryKeyState = atom({
	key: 'jobByIdQueryKeyState',
	default: new Date(),
});

const jobByIdQuery = selectorFamily<JobWithCompany | null, string>({
	key: 'jobByIdQuery',
	get:
		(id) =>
		async ({ get }) => {
			get(jobByIdQueryKeyState);
			const config = get(authenticatedApiConfigurationSelector);

			if (config == null) {
				return null;
			}

			return new JobsApi(config)
				.jobsControllerGetJobById({ id })
				.then((value) => value as JobWithCompany)
				.catch(() => null);
		},
});

export default jobByIdQuery;
