import { OptionsRouter, Redirect, RouteMiddleware, stringParser } from 'react-typesafe-routes';
import { useRecoilValue } from 'recoil';
import JobsPage from './pages/JobsPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SavedPage from './pages/SavedPage';
import { currentUserId } from './store/auth';

const AuthMiddleware: RouteMiddleware = (next) => {
	const id = useRecoilValue(currentUserId);

	if (id === null) {
		return () => <Redirect to={router.login()} />;
	}
	return next;
};

const LoginMiddleware: RouteMiddleware = (next) => {
	const id = useRecoilValue(currentUserId);

	if (id !== null) {
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
		// TODO: Replace with RegisterPage
		component: LoginPage,
		options: {
			showAppBar: false,
			showDrawer: false,
		},
	}),

	landing: route('', {
		component: LandingPage,
	}),
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
