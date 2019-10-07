import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import {fetchCollectionStart} from '../redux/shop/shop.sagas';

const sagaMiddlewares = createSagaMiddleware();

const middlewares = [sagaMiddlewares];

if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddlewares.run(fetchCollectionStart);

export const persistor = persistStore(store);

export default {store, persistor};