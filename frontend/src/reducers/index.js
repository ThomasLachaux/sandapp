import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

import sandwiches from './sandwiches';

const reducers = combineReducers({ sandwiches });

const logger = createLogger({ collapsed: true, predicate: () => !import.meta.env.PROD });
const store = createStore(reducers, applyMiddleware(logger));

export default store;
