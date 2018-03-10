// import { ActionType } from '../types';

export const adminActions = {
    GET_ACCOUNT: {
        REQUEST: 'GET_ACCOUNT_REQUEST',
        SUCCESS: 'GET_ACCOUNT_SUCCESS',
        FAIL: 'GET_ACCOUNT_FAIL',
    },
    RECHARGE: {
        REQUEST: 'RECHARGE_REQUEST',
        SUCCESS: 'RECHARGE_SUCCESS',
        FAIL: 'RECHARGE_FAIL',
    }
};

export const requestGetAccount = (name: string) => {
    return {
        type: adminActions.GET_ACCOUNT.REQUEST,
        payload: {
            name
        }
    };
};

export const requestCharge = (userId: string, amount: number, name: string) => {
    return {
        type: adminActions.RECHARGE.REQUEST,
        payload: {
            userId,
            amount,
            name,
        }
    };
};
