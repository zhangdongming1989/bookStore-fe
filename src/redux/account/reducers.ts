/// <reference path="../types.d.ts" />
/// <reference path="./types.d.ts" />
import { accountActions } from './actions';

// tslint:disable no-debugger

export const initialState: StateAccountTypes = {
    loginStatus: null,
    currentUser: null
};

export const accountReducer = (
    state = initialState,
    action: {type: string, payload: Object, [propName: string]: Object}
    ) => {
    const { payload } = action;
    if (action.type === accountActions.LOGIN.SUCCESS) {
        return {
            ...state,
            loginStatus: payload,
        };
    }
    if (action.type === accountActions.LOGIN.FAIL) {
        return {
            ...state,
            loginStatus: payload
        };
    }

    if (
        action.type === accountActions.LOGIN.CLEAR ||
        action.type === accountActions.LOGIN.REQUEST
    ) {
        return {
            ...state,
            loginStatus: null,
        };
    }

    if (action.type === accountActions.PROFILE.SUCCESS) {
        return {
            ...state,
            currentUser: payload,
        };
    }
    return state;
};