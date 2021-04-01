import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

import sandwiches from './sandwiches';
import user from './user';

const reducers = combineReducers({ sandwiches, user });

const logger = createLogger({ collapsed: true, predicate: () => !import.meta.env.PROD });
const store = createStore(reducers, applyMiddleware(logger));

export default store;
