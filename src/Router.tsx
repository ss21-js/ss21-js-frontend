import { OptionsRouter, Redirect, RouteMiddleware } from 'react-typesafe-routes';
import { useRecoilValue } from 'recoil';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
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
		return () => <Redirect to={router.home()} />;
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
	home: route('app', {
		middleware: AuthMiddleware,
		component: HomePage,
	}),
	fallback: route('*', {
		component: () => <Redirect to={router.home()} />,
	}),
}));

export default router;
