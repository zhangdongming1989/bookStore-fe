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
    ACTIONUPDATE: {
        REQUEST: 'CART_ACTIONUPDATE_REQUEST',
        SUCCESS: 'CART_ACTIONUPDATE_SUCCESS',
        FAIL: 'CART_ACTIONUPDATE_FAIL',
    },
    DELETE: {
        REQUEST: 'CART_DELETE_REQUEST',
        SUCCESS: 'CART_DELETE_SUCCESS',
        FAIL: 'CART_DELETE_FAIL',
    },
    ORDERCREATE: {
        REQUEST: 'CART_CREATEORDER_REQUEST',
        SUCCESS: 'CART_CREATEORDER_SUCEESS',
        FAIL: 'CART_CREATEORDER_FAIL',
    }
};

export const requestCart = () => {
    return {
        type: cartActions.GET.REQUEST,
    };
};

export const actionUpdateCart = (bookInfo: UpdateBookActionType) => {
    return {
        type: cartActions.ACTIONUPDATE.REQUEST,
        payload: bookInfo,
    };
};

export const requestCreateOrder = (addressId: number) => {
    return {
        type: cartActions.ORDERCREATE.REQUEST,
        payload: addressId,
    };
};
