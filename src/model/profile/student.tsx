import { Address } from '../address';
import { University } from '../university';
import { Jobhistory } from '../jobhistory';

export interface Student {
	email: string;
	firstname: string;
	lastname: string;
	description: string;
	yearsOfExperience: number;
	address: Address[];
	university: University[];
	semester: string;
	job_history: Jobhistory[];
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
