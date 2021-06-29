import { selectorFamily } from 'recoil';
import { Octokit } from '@octokit/core';

const octokit = new Octokit();

const githubQuery = selectorFamily({
	key: 'githubQuery',
	get: (username: string) => async () => {
		try {
			const { data } = await octokit.request(`GET /users/${username}/repos`);

			data.map((repo: any) => ({
				stargazers_count: repo.stargazers_count,
				watchers_count: repo.watchers_count,
				forks_count: repo.forks_count,
				language: repo.language,
			}));
			return data;
		} catch (error) {
			throw error;
		}
	},
});

export default githubQuery;
