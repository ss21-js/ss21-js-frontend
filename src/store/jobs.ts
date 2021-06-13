import { add } from 'date-fns';
import { Job, JobsApi } from 'js-api-client';
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

export const jobSearchJobs = selector<Job[] | null>({
	key: 'jobSearchJobs',
	get: async ({ get }) => {
		const config = get(authenticatedApiConfiguration);

		const languages = get(jobSearchLanguages);
		const searchString = get(jobSearchSearchString);
		const skills = get(jobSearchSkills);
		const workArea = get(jobSearchWorkArea);
		const workBasis = get(jobSearchWorkBasis);
		const from = get(jobSearchFrom);
		const to = get(jobSearchTo);

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
				},
			})
			.then((value) => value as Job[])
			.catch(() => null);
	},
});

export const singlejob = selectorFamily<Job | null, string>({
	key: 'singlejob',
	get:
		(id) =>
		async ({ get }) => {
			const config = get(authenticatedApiConfiguration);

			if (config == null) {
				return null;
			}

			return new JobsApi(config)
				.jobsControllerGetJobById({ id })
				.then((value) => value as Job)
				.catch(() => null);
		},
});
