import { applyMiddleware, compose, createStore } from 'redux';
// import { browserHistory } from 'react-router';
// import { routerMiddleware } from 'react-router-redux';
// import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, RootState } from './storeConfigure';

const composeEnhancers = (
    process.env.NODE_ENV === 'development' &&
       // tslint:disable no-string-literal
    window && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
) || compose;

function configureStore(initialState?: RootState) {
    const enhancer = composeEnhancers(
        applyMiddleware()
    );
    return createStore(
        rootReducer,
        initialState!,
        enhancer,
    );
}

const store = configureStore();

export default store;