import CreateJobPage from 'pages/CreateJobPage';
import SearchPage from 'pages/SearchPage';
import LandingPage from 'pages/LandingPage';
import LoginPage from 'pages/LoginPage';
import OnboardingCompanyPage from 'pages/OnboardingCompanyPage';
import OnboardingPage from 'pages/OnboardingPage';
import OnboardingStudentPage from 'pages/OnboardingStudentPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import SavedPage from 'pages/SavedPage';
import React from 'react';
import {
	dateParser,
	intParser,
	OptionsRouter,
	ParamParser,
	Redirect,
	RouteMiddleware,
	stringParser,
} from 'react-typesafe-routes';
import { useRecoilValue } from 'recoil';
import currentFirebaseUserState from 'store/auth/currentFirebaseUserState';
import currentUserState from 'store/user/currentUserState';
import JobPage from 'pages/JobPage';

const AuthMiddleware: RouteMiddleware = (next) => {
	const firebaseUser = useRecoilValue(currentFirebaseUserState);
	const user = useRecoilValue(currentUserState);

	if (firebaseUser === null) {
		return () => <Redirect to={router.login()} />;
	}

	if (user === null) {
		return () => <Redirect to={router.onboarding()} />;
	}

	return next;
};

const LoginMiddleware: RouteMiddleware = (Next) => {
	const firebaseUser = useRecoilValue(currentFirebaseUserState);
	if (firebaseUser !== null) {
		return () => <Redirect to={router.onboarding()} />;
	}
	return Next;
};

const OnboardingMiddleware: RouteMiddleware = (next) => {
	const firebaseUser = useRecoilValue(currentFirebaseUserState);
	const user = useRecoilValue(currentUserState);

	if (firebaseUser === null) {
		return () => <Redirect to={router.login()} />;
	}

	if (user !== null) {
		return () => <Redirect to={router.app().search({})} />;
	}

	return next;
};

const routeOptions = {
	showAppBar: true,
	showDrawer: true,
};

const stringArrayParser: ParamParser<string[]> = {
	parse: (s) =>
		s
			.substring(1, s.length - 1)
			.split(',')
			.filter((s) => s !== ''),
	serialize: (x) => `[${x.join(',')}]`,
};

const router = OptionsRouter(routeOptions, (route) => ({
	login: route('login', {
		middleware: LoginMiddleware,
		component: LoginPage,
		options: {
			showAppBar: false,
			showDrawer: false,
		},
	}),
	register: route('registrieren', {
		middleware: LoginMiddleware,
		component: RegisterPage,
		options: {
			showAppBar: false,
			showDrawer: false,
		},
	}),

	landing: route('', {
		component: LandingPage,
	}),
	onboarding: route(
		'onboarding',
		{
			component: OnboardingPage,
			middleware: OnboardingMiddleware,
		},
		(route) => ({
			student: route('student', {
				component: OnboardingStudentPage,
			}),
			company: route('unternehmen', {
				component: OnboardingCompanyPage,
			}),
		})
	),
	app: route(
		'app',
		{
			middleware: AuthMiddleware,
			component: () => <Redirect to={router.app().search({})} />,
		},
		(route) => ({
			search: route(
				'jobsuche/&:from?&:to?&:languages?&:skills?&:workArea?&:workBasis?&:skip?&:limit?&:searchString?&:jobId?',
				{
					component: SearchPage,
					params: {
						jobId: stringParser,
						from: dateParser,
						to: dateParser,
						languages: stringArrayParser,
						skills: stringArrayParser,
						workArea: stringParser,
						workBasis: intParser,
						skip: intParser,
						limit: intParser,
						searchString: stringParser,
					},
				}
			),
			job: route('job/:id', {
				component: JobPage,
				params: {
					id: stringParser,
				},
			}),
			createJob: route('job-erstellen', {
				component: CreateJobPage,
			}),
			saved: route('gespeichert/&:jobId?', {
				component: SavedPage,
				params: {
					jobId: stringParser,
				},
			}),
			profile: route('profil', {
				component: ProfilePage,
			}),
			otherProfile: route('profil/:id', {
				component: ProfilePage,
				params: {
					id: stringParser,
				},
			}),
		})
	),
	fallback: route('*', {
		component: () => <Redirect to={router.app().search({})} />,
	}),
}));

export default router;
