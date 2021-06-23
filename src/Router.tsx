import JobsPage from 'pages/JobsPage';
import LandingPage from 'pages/LandingPage';
import LoginPage from 'pages/LoginPage';
import OnboardingCompanyPage from 'pages/OnboardingCompanyPage';
import OnboardingPage from 'pages/OnboardingPage';
import OnboardingStudentPage from 'pages/OnboardingStudentPage';
import ProfilePage from 'pages/ProfilePage';
import RegisterPage from 'pages/RegisterPage';
import SavedPage from 'pages/SavedPage';
import React from 'react';
import { OptionsRouter, Redirect, RouteMiddleware, stringParser } from 'react-typesafe-routes';
import { useRecoilValue } from 'recoil';
import { currentFirebaseUser } from 'store/auth';
import { currentUserAtom } from 'store/user';

const AuthMiddleware: RouteMiddleware = (next) => {
	const firebaseUser = useRecoilValue(currentFirebaseUser);
	const user = useRecoilValue(currentUserAtom);

	if (firebaseUser === null) {
		return () => <Redirect to={router.login()} />;
	}

	if (user === null) {
		return () => <Redirect to={router.onboarding()} />;
	}

	return next;
};

const LoginMiddleware: RouteMiddleware = (Next) => {
	const firebaseUser = useRecoilValue(currentFirebaseUser);
	if (firebaseUser !== null) {
		return () => <Redirect to={router.onboarding()} />;
	}
	return Next;
};

const OnboardingMiddleware: RouteMiddleware = (next) => {
	const firebaseUser = useRecoilValue(currentFirebaseUser);
	const user = useRecoilValue(currentUserAtom);

	if (firebaseUser === null) {
		return () => <Redirect to={router.login()} />;
	}

	if (user !== null) {
		return () => <Redirect to={router.app().jobs({})} />;
	}

	return next;
};

const routeOptions = {
	showAppBar: true,
	showDrawer: true,
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
	register: route('register', {
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
			component: () => <Redirect to={router.app().jobs({})} />,
		},
		(route) => ({
			jobs: route('jobs/:jobId?', {
				component: JobsPage,
				params: {
					jobId: stringParser,
				},
			}),
			saved: route('saved', {
				component: SavedPage,
			}),
			profile: route('profile', {
				component: ProfilePage,
			}),
		})
	),
	fallback: route('*', {
		component: () => <Redirect to={router.app().jobs({})} />,
	}),
}));

export default router;
