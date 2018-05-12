// import { ActionType } from '../types';
import * as Moment from 'moment';
import {
    BookAddressPayloadType,
    BookListRequestParam,
    ConfirmSentParamType,
    ResetPassword
} from './types';

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
    CHANGE_DELIVERIED_QUANTITY: {
        REQUEST: 'ADMIN_CHANGE_DELIVERIED_QUANTITY_REQUEST',
        SUCCESS: 'ADMIN_CHANGE_DELIVERIED_QUANTITY_SUCCESS',
        FAIL: 'ADMIN_CHANGE_DELIVERIED_QUANTITY_FAIL',
    },
    BOOKLIST: {
        REQUEST: 'ADMIN_BOOKLIST_REQUEST',
        SUCCESS: 'ADMIN_BOOKLIST_SUCCESS',
        FAIL: 'ADMIN_BOOKLIST_FAIL',
    },
    SELLER_LIST: {
        REQUEST: 'ADMIN_SELLERLIST_REQUEST',
        SUCCESS: 'ADMIN_SELLERLIST_SUCCESS',
        FAIL: 'ADMIN_SELLERLIST_SUCCESS',
    },
    RESET_PASSWORD: {
        REQUEST: 'ADMIN_RESET_PASSWORD_REQUEST',
        SUCCESS: 'ADMIN_RESET_PASSWORD_SUCCESS',
        FAIL: 'ADMIN_RESET_PASSWORD_FAIL',
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

export const requestIsbnBookList = (isbn: string, time: [Moment.Moment, Moment.Moment]) => {
    return {
        type: adminActions.GET_ISBN_BOOK_LIST.REQUEST,
        payload: {
            isbn,
            time,
        }
    };
};

export const requestConfirmSent = (orderId: string, requestParams: ConfirmSentParamType) => {
    return {
        type: adminActions.CONFIRM_SENT.REQUEST,
        payload: {
            order_id: orderId,
            requestParams,
        },
    };
};

export const requestChangeDeliveriedQuantity =
    (userId: string, orderId: string, quantity: number, requestParams: BookAddressPayloadType ) => {
    return {
        type: adminActions.CHANGE_DELIVERIED_QUANTITY.REQUEST,
        payload: {
            userId,
            orderId,
            quantity,
            requestParams,
        }
    };
};

export const requestBookList = (params: BookListRequestParam) => {
    return {
        type: adminActions.BOOKLIST.REQUEST,
        payload: params,
    };
};

export const requestSellerList = () => {
    return {
        type: adminActions.SELLER_LIST.REQUEST,
    };
};

export const requestResetPassword = (params: ResetPassword) => {
    return {
        type: adminActions.RESET_PASSWORD.REQUEST,
        payload: params
    };
};
