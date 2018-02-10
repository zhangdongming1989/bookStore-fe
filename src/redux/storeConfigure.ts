import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import { accountReducer, State as AccountState } from './account';

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
    router: RouterState;
    account: AccountState;
}

export const rootReducer = combineReducers<RootState>({
    router: routerReducer,
    account: accountReducer,
});