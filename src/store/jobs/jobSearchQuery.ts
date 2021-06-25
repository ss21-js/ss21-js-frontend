import { JobsApi, JobWithCompany } from 'js-api-client';
import { atom, selector } from 'recoil';
import authenticatedApiConfigurationSelector from 'store/api/authenticatedApiConfigurationSelector';
import jobSearchFromState from './jobSearch/jobSearchFromState';
import jobSearchLanguagesState from './jobSearch/jobSearchLanguagesState';
import jobSearchLimitState from './jobSearch/jobSearchLimitState';
import jobSearchSearchStringState from './jobSearch/jobSearchSearchStringState';
import jobSearchSkillsState from './jobSearch/jobSearchSkillsState';
import jobSearchSkipState from './jobSearch/jobSearchSkipState';
import jobSearchToState from './jobSearch/jobSearchToState';
import jobSearchWorkAreaState from './jobSearch/jobSearchWorkAreaState';
import jobSearchWorkBasisState from './jobSearch/jobSearchWorkBasisState';

export const jobSeachQueryKeyState = atom({
	key: 'jobSeachKeyState',
	default: new Date(),
});

const jobSearchQuery = selector<JobWithCompany[] | null>({
	key: 'jobSearchJobs',
	get: async ({ get }) => {
		get(jobSeachQueryKeyState);

		const config = get(authenticatedApiConfigurationSelector);

		const searchString = get(jobSearchSearchStringState);
		const workArea = get(jobSearchWorkAreaState);
		const workBasis = get(jobSearchWorkBasisState);
		const languages = get(jobSearchLanguagesState);
		const skills = get(jobSearchSkillsState);
		const from = get(jobSearchFromState);
		const to = get(jobSearchToState);
		const skip = get(jobSearchSkipState);
		const limit = get(jobSearchLimitState);

		if (config == null) {
			return null;
		}

		return new JobsApi(config)
			.jobsControllerSearchJobs({
				searchJobDto: {
					searchString,
					languages,
					skills,
					workArea,
					workBasis,
					from,
					to,
					skip,
					limit,
				},
			})
			.catch(() => null);
	},
});

export default jobSearchQuery;
