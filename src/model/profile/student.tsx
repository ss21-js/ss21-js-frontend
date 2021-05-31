export interface Student {
	university: string;
	semester: string;
	website: string;
	location: string;
	status: "Student";
	skills: string[];
	bio: string;
	 githubusername: string;
	experience: [
		{
			title: string;
			company: string;
			location: string;
			from: Date;
			to: Date;
			current: boolean;
			description: string;
		}
	],
	education: [
		{
			school: string;
			degree: string;
			fieldofstudy: string;
			from: string;
			to: string;
			current: boolean;
			description: string;
		}
	],
	social: {
		youtube: string;
		twitter: string;
		facebook: string;
		linkedin: string;
		instagram: string;
		github: string;
	}
}
