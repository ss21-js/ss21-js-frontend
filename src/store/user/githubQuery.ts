import { selectorFamily } from 'recoil';
import { Octokit } from '@octokit/core';

const gitToken = `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`;
const octokit = new Octokit({ auth: gitToken });

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
