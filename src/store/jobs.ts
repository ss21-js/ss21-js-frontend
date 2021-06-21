import { add } from 'date-fns';
import { JobsApi, JobWithCompany } from 'js-api-client';
import { atom, selector, selectorFamily } from 'recoil';
import { authenticatedApiConfiguration } from './api';

export const jobSearchSearchString = atom<string>({
	key: 'jobSearchSearchString',
	default: '',
});

export const jobSearchLanguages = atom<string[]>({
	key: 'jobSearchLanguages',
	default: [],
});

export const jobSearchSkills = atom<string[]>({
	key: 'jobSearchSkills',
	default: [],
});

export enum WorkArea {
	NONE = '',
	FULLSTACK = 'fullstack',
	BACKEND = 'backend',
	FRONTEND = 'frontend',
}

export const jobSearchWorkArea = atom<WorkArea>({
	key: 'jobSearchWorkArea',
	default: WorkArea.NONE,
});

export enum WorkBasis {
	NONE = 0,
	PART_TIME = 1,
	FULL_TIME = 2,
}

export const jobSearchWorkBasis = atom<WorkBasis>({
	key: 'jobSearchWorkBasis',
	default: WorkBasis.NONE,
});

export const jobSearchFrom = atom<Date>({
	key: 'jobSearchFrom',
	default: new Date(),
});

export const jobSearchTo = atom<Date>({
	key: 'jobSearchTo',
	default: add(new Date(), { months: 3 }),
});

export const jobSearchLimit = atom<number>({
	key: 'jobSearchLimit',
	default: 0,
});

export const jobSearchSkip = atom<number>({
	key: 'jobSearchSkip',
	default: 0,
});

export const jobSearchQuery = selector<JobWithCompany[] | null>({
	key: 'jobSearchJobs',
	get: async ({ get }) => {
		const config = get(authenticatedApiConfiguration);

		const searchString = get(jobSearchSearchString);
		const workArea = get(jobSearchWorkArea);
		const workBasis = get(jobSearchWorkBasis);
		const languages = get(jobSearchLanguages);
		const skills = get(jobSearchSkills);
		const from = get(jobSearchFrom);
		const to = get(jobSearchTo);
		const skip = get(jobSearchSkip);
		const limit = get(jobSearchLimit);

		if (config == null) {
			return null;
		}

		await new Promise((r) => setTimeout(r, 3000));

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
			.then((value) => value as JobWithCompany[])
			.catch(() => null);
	},
});

export const jobByIdQuery = selectorFamily<JobWithCompany | null, string>({
	key: 'jobByIdQuery',
	get:
		(id) =>
		async ({ get }) => {
			const config = get(authenticatedApiConfiguration);

			if (config == null) {
				return null;
			}

			return new JobsApi(config)
				.jobsControllerGetJobById({ id })
				.then((value) => value as JobWithCompany)
				.catch(() => null);
		},
});
