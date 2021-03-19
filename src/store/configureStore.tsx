import { AnyAction } from 'deox';
import * as localforage from 'localforage';
import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { PersistConfig, Persistor, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootEpic from './root.epic';
import { rootReducer, RootState } from './root.reducer';

const persistConfig: PersistConfig<RootState> = {
	key: 'root',
	version: 1,
	storage: localforage,
	blacklist: [],
};

const dev = process.env.NODE_ENV === 'development';
const logger = createLogger();

const epicMiddleware = createEpicMiddleware();

const middlewares: Middleware<never>[] = [thunk, epicMiddleware];

if (dev) {
	middlewares.push(logger);
}

let middleware = applyMiddleware(...middlewares);

if (dev) {
	middleware = composeWithDevTools(middleware);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (): {
	store: Store<RootState, AnyAction>;
	persistor: Persistor;
} => {
	const store = createStore(persistedReducer, middleware);
	epicMiddleware.run(rootEpic as never);

	const persistor = persistStore(store);

	return { store, persistor };
};
export default configureStore;
