import { Address } from '../address';
import { University } from '../university';
import { JobHistory } from '../jobHistory';

export interface Student {
	email: string;
	firstname: string;
	lastname: string;
	description: string;
	yearsOfExperience: number;
	address: Address[];
	university: University[];
	semester: string;
	job_history: JobHistory[];
	jobsMarkedIds: string[];
	skills: string[];
	datesAvailable: string[];
	workArea: string;
	workBasis: number;
	githubusername: string;
	social: {
		facebook: string;
		linkedin: string;
		github: string;
	};
}
