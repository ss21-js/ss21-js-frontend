import { Job, JobWithCompany } from 'js-api-client';
import { selector } from 'recoil';
import userResponseQuery from 'store/user/userResponseQuery';

const userJobsQuery = selector<Job[] | JobWithCompany[] | null>({
	key: 'userJobsQuery',
	get: ({ get }) => {
		const userResponse = get(userResponseQuery);
		return userResponse?.assignedJobs ?? null;
	},
});

export default userJobsQuery;
