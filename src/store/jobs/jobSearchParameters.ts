import { SearchJobDto, Student } from 'js-api-client';
import { atom, selector } from 'recoil';
import currentUserState from 'store/user/currentUserState';
import currentUserTypeState from 'store/user/currentUserTypeState';
import UserType from 'models/userType';
import { add } from 'date-fns';
import WorkArea from 'models/workArea';
import WorkBasis from 'models/workBasis';

const jobSearchParametersDefaults = selector<SearchJobDto>({
	key: 'jobSearchParametersDefaults',
	get: ({ get }) => {
		const user = get(currentUserState);
		const type = get(currentUserTypeState);

		if (type === UserType.STUDENT) {
			const student = user as Student;
			return {
				from: student.fromAvailable,
				to: student.toAvailable,
				skills: student.skills,
				languages: student.languages,
				searchString: '',
				limit: 50,
				skip: 0,
				workArea: student.workArea,
				workBasis: student.workBasis,
			};
		}

		return {
			from: new Date(),
			to: add(new Date(), { months: 3 }),
			skills: [],
			languages: [],
			searchString: '',
			limit: 50,
			skip: 0,
			workArea: WorkArea.NONE,
			workBasis: WorkBasis.NONE,
		};
	},
});

const jobSearchParameters = atom<SearchJobDto>({
	key: 'jobSearchParameters',
	default: jobSearchParametersDefaults,
});

export default jobSearchParameters;
