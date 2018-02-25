import { AjaxResponse } from 'rxjs/Rx';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { ActionType, EpicType, RootState } from '../types';
import { cartActions } from './actions';
import { message } from 'antd';
import { API_ROOT } from '../../constants';

//tslint:disable
const getCartEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(cartActions.GET.REQUEST)
        .mergeMap(() => ajax.get(
            `${API_ROOT}/cart/query`,
            )
                .map((res: AjaxResponse) => {
                    return {type: cartActions.GET.SUCCESS, payload: Object.values(res.response.payload)};
                })
        );

const addCartEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(cartActions.ADD.REQUEST)
        .mergeMap((action: ActionType) => ajax.post(
            `${API_ROOT}/cart/add`,
            {
                ...action.payload,
            },
            {
                'Content-Type': 'application/json',
            })
            .map((res: AjaxResponse) => {
                if(res.status === 200) {
                    message.success('添加到购物车成功！')
                    return {type: cartActions.GET.REQUEST};
                }
                return {
                    type: cartActions.ADD.FAIL,
                    payload: res.response.payload.message,
                }
            })
        );

const removeCartEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(cartActions.DELETE.REQUEST)
        .mergeMap((action: {type: string, payload: {cart_id: string}}) => ajax.get(
            `${API_ROOT}/cart/remove/${action.payload.cart_id}`)
            .map((res: AjaxResponse) => {
                if(res.status === 200) {
                    return {type: cartActions.GET.REQUEST};
                }
                return {
                    type: cartActions.DELETE.FAIL,
                    payload: res.response.payload.message,
                }
            })
        );

const updateCartEpic:Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(cartActions.UPDATE.REQUEST)
        .mergeMap((action: ActionType) => ajax.post(
            `${API_ROOT}/cart/update`,
            {
                ...action.payload,
            },
            {
                'Content-Type': 'application/json',
            })
            .map((res: AjaxResponse) => {
                if(res.status === 200) {
                    return {type: cartActions.GET.REQUEST};
                }
                return {
                    type: cartActions.ADD.FAIL,
                    payload: res.response.payload.message,
                }
            })
        );


const actionUpdateCartEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>, {getState}) =>
    action$
        .ofType(cartActions.ACTIONUPDATE.REQUEST)
        .map((action: ActionType) => {
            const {action: updateAction, book_id, quantity, cart_id} = action.payload as UpdateBookActionType
            const store = getState() as RootState
            const cartList = store.cart.cart;
            const bookData = cartList.find(val => val.book_id === book_id);
            // 如果列表中没有这本书，就 add
            if(updateAction === 'add' && !bookData) {
                return {
                    type: cartActions.ADD.REQUEST,
                    payload: {
                        book_id,
                        quantity,
                    }
                }
            }

            if(updateAction === 'delete') {
                return {
                    type: cartActions.DELETE.REQUEST,
                    payload: {
                        cart_id
                    }
                }
            }
            return {
                type: cartActions.UPDATE.REQUEST,
                payload: {
                    cart_id: cart_id || (bookData as StateCartType).id,
                    quantity,
                }
            }

        });

const createOrderEpic:Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(cartActions.ORDERCREATE.REQUEST)
        .mergeMap((action: ActionType) => ajax.post(
            `${API_ROOT}/order/create`,
            {
                address_id: action.payload,
            },
            {
                'Content-Type': 'application/json',
            })
            .map((res: AjaxResponse) => {
                if(res.status === 200 && res.response.status === 'ok') {
                    message.success('下单成功！')
                     setTimeout(() => {
                            location.href= '/';
                            return {
                                type: cartActions.GET.REQUEST,
                            }
                    }, 2000)
                    return {
                        type: '',
                    }
                } else {
                    message.error('下单失败！')
                    return {
                        type: cartActions.ORDERCREATE.FAIL,
                    }
                }
            })
        );

export default combineEpics(getCartEpic, addCartEpic, removeCartEpic, updateCartEpic, actionUpdateCartEpic, createOrderEpic);