import { applyMiddleware, compose, createStore } from 'redux';
// import { browserHistory } from 'react-router';
// import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from './storeConfigure';
// import { RootState } from './types';
import rootEpics from './epics';

const composeEnhancers = (
    process.env.NODE_ENV === 'development' &&
       // tslint:disable no-string-literal
    window && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
) || compose;

export function configureStore(initialState?: object) {
    const middleWares = [createEpicMiddleware(rootEpics)];
    const enhancer = composeEnhancers(
        applyMiddleware(...middleWares)
    );
    return createStore(
        rootReducer,
        initialState!,
        enhancer,
    );
}
