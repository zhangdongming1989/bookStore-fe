/// <reference path="../types.d.ts" />
/// <reference path="./types.d.ts" />
import { ActionType } from '../types';

export const accountActions = {
     LOGIN: {
         REQUEST: 'ACCOUNT_LOGIN_REQUEST',
         SUCCESS: 'ACCOUNT_LOGIN_SUCCESS',
         FAIL: 'ACCOUNT_LOGIN_FAIL',
         CLEAR: 'ACCOUNT_LOGIN_CLEAR',
     }
};

export const requestLogin = (payload: LoginInputType): ActionType => {
    return {
        type: accountActions.LOGIN.REQUEST,
        payload,
    };
};

export const clearLoginStatus = () => {
    return {
        type: accountActions.LOGIN.CLEAR
    };
};

export enum Status {
    ok = 'ok',
    fail = 'fail',
}
