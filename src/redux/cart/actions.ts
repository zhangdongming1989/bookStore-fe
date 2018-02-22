// import { ActionType } from '../types';

export const cartActions = {
    GET: {
        REQUEST: 'CART_GET_REQUEST',
        SUCCESS: 'CART_GET_SUCCESS',
        FAIL: 'CART_GET_FAIL',
    },
    ADD: {
        REQUEST: 'CART_ADD_REQUEST',
        SUCCESS: 'CART_ADD_SUCCESS',
        FAIL: 'CART_ADD_FAIL',
    },
    UPDATE: {
        REQUEST: 'CART_UPDATE_REQUEST',
        SUCCESS: 'CART_UPDATE_SUCCESS',
        FAIL: 'CART_UPDATE_FAIL',
    },
    DELETE: {
        REQUEST: 'CART_DELETE_REQUEST',
        SUCCESS: 'CART_DELETE_SUCCESS',
        FAIL: 'CART_DELETE_FAIL',
    }
};

export const requestCart = () => {
    return {
        type: cartActions.GET.REQUEST,
    };
};

export const updateCart = (bookInfo: UpdateBookActionType) => {
    return {
        type: cartActions.UPDATE.REQUEST,
        payload: bookInfo,
    };
};