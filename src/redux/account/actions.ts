/// <reference path="../types.d.ts" />
/// <reference path="./types.d.ts" />
import { ActionType } from '../types';

export const accountActions = {
     LOGIN: {
         REQUEST: 'ACCOUNT_LOGIN_REQUEST',
         SUCCESS: 'ACCOUNT_LOGIN_SUCCESS',
         FAIL: 'ACCOUNT_LOGIN_FAIL',
         CLEAR: 'ACCOUNT_LOGIN_CLEAR',
     },
    PROFILE: {
         REQUEST: 'ACCOUNT_PROFILE_REQUEST',
         SUCCESS: 'ACCOUNT_PROFILE_SUCCESS',
         FAIL: 'ACCOUNT_PROFILE_FAIL',
         CLEAR: 'ACCOUNT_PROFILE_CLEAR',
    },
    REGISTER: {
         REQUEST: 'ACCOUNT_REGISTER_REQUEST',
         SUCCESS: 'ACCOUNT_REGISTER_SUCCESS',
         FAIL: 'ACCOUNT_REGISTER_FAIL',
         CLEAR: 'ACCOUNT_REGISTER_CLEAR',
    },
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

export const requestRegister = (payload: RegisterInputType): ActionType => {
    return {
        type: accountActions.REGISTER.REQUEST,
        payload,
    };
};

export const clearRegisterStatus = () => {
    return {
        type: accountActions.REGISTER.CLEAR
    };
};

export enum Status {
    ok = 'ok',
    fail = 'fail',
}
