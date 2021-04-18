import { OptionsRouter, Redirect, RouteMiddleware } from 'react-typesafe-routes';
import { useRecoilValue } from 'recoil';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SavedPage from './pages/SavedPage';
import SearchPage from './pages/SearchPage';
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
		return () => <Redirect to={router.app().search()} />;
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
	app: route(
		'app',
		{
			middleware: AuthMiddleware,
			component: () => <Redirect to={router.app().search()} />,
		},
		(route) => ({
			search: route('search', {
				component: SearchPage,
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
		component: () => <Redirect to={router.app().search()} />,
	}),
}));

export default router;
