import { useSelector } from 'react-redux';
import { OptionsRouter, Redirect, RouteMiddleware } from 'react-typesafe-routes';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import { fromRoot } from './store';

const AuthMiddleware: RouteMiddleware = (next) => {
	const firebaseUser = useSelector(fromRoot.firebaseUser);

	if (firebaseUser === null) {
		return () => <Redirect to={router.login()} />;
	}
	return next;
};

const LoginMiddleware: RouteMiddleware = (next) => {
	const firebaseUser = useSelector(fromRoot.firebaseUser);

	if (firebaseUser !== null) {
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
	home: route('', {
		middleware: AuthMiddleware,
		component: HomePage,
	}),
	todo: route('todo', {
		middleware: AuthMiddleware,
		component: TodoPage,
	}),
}));

export default router;
