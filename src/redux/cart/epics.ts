import { AjaxResponse } from 'rxjs/Rx';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { ActionType, EpicType, RootState } from '../types';
import { cartActions } from './actions';
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
                if(res.response.payload.status === 'ok') {
                    return {type: cartActions.ADD.SUCCESS, payload: res.response};
                }
                return {
                    type: cartActions.ADD.FAIL,
                    payload: res.response.payload.message,
                }
            })
        );

const removeCartEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(cartActions.ADD.REQUEST)
        .mergeMap((action: {type: string, payload: {book_id: string}}) => ajax.get(
            `${API_ROOT}/cart/remove${action.payload.book_id}`)
            .map((res: AjaxResponse) => {
                if(res.status === 200) {
                    return {type: cartActions.DELETE.SUCCESS, payload: {book_id: action.payload.book_id}};
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
                if(res.response.payload.status === 'ok') {
                    return {type: cartActions.ADD.SUCCESS, payload: res.response};
                }
                return {
                    type: cartActions.ADD.FAIL,
                    payload: res.response.payload.message,
                }
            })
        );


const actionUpdateCartEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>, {getState}) =>
    action$
        .ofType(cartActions.UPDATE.REQUEST)
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
                        book_id
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

export default combineEpics(getCartEpic, addCartEpic, removeCartEpic, updateCartEpic, actionUpdateCartEpic);