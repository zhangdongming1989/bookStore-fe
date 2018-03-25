// import { ActionType } from '../types';
import * as Moment from 'moment';
import { BookAddressPayloadType } from './types';

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
    },
    GET_ISBN_BOOK_LIST: {
        REQUEST: 'GET_ISBN_BOOK_LIST_REQUEST',
        SUCCESS: 'GET_ISBN_BOOK_LIST_SUCCESS',
        FAIL: 'GET_ISBN_BOOK_LIST_FAIL',
    },
    CONFIRM_SENT: {
        REQUEST: 'CONFIRM_SENT_REQUEST',
        SUCCESS: 'CONFIRM_SENT_SUCCESS',
        FAIL: 'CONFIRM_SENT_FAIL',
    },
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

export const requestIsbnBookList = (isbn: string, time: [Moment.Moment, Moment.Moment]) => {
    return {
        type: adminActions.GET_ISBN_BOOK_LIST.REQUEST,
        payload: {
            isbn,
            time,
        }
    };
};

export const requestConfirmSent = (orderId: string, requestParams: BookAddressPayloadType) => {
    return {
        type: adminActions.CONFIRM_SENT.REQUEST,
        payload: {
            orderId,
            requestParams,
        },
    };
};
