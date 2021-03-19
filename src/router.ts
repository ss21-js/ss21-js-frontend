import { Router } from 'react-typesafe-routes';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';

// Read more about writing a middleware or add query parameter etc.
// https://github.com/innFactory/react-typesafe-routes

const router = Router((route) => ({
	home: route('/', {
		component: HomePage,
	}),
	todo: route('todo', {
		component: TodoPage,
	}),
}));

export default router;
