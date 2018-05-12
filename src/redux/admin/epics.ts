import { AjaxError, AjaxResponse, Observable } from 'rxjs/Rx';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { message } from 'antd';
import { ajax } from 'rxjs/observable/dom/ajax';
import { adminActions } from './actions';
import { API_ROOT, DATE_FORMAT } from '../../constants';
import { ActionType, EpicType } from '../types';
import {
    ActionBookAddress, ActionBookListRequestType,
    ActionChangeDeliverdCountType,
    ActionChargeRequestType,
    ActionGetAccountType,
    ConfirmSentParamAction,
    ResetPasswordAction,
    StateBookAddress
} from './types';

const orderQueryMap = {
    selling: '/order/admin/query/ongoing',
    sold: '/order/admin/query/finished',
};

// tslint:disable
const loginEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(adminActions.GET_ACCOUNT.REQUEST)
        .mergeMap((action: ActionGetAccountType) =>
            ajax.get(`${API_ROOT}/account/query_by_name/${action.payload.name}`)
            .map((res: AjaxResponse) => {
                const resData  = res.response.payload as StateAccountInfoType;
                return {
                    type: adminActions.GET_ACCOUNT.SUCCESS,
                    payload: {
                        name: action.payload.name,
                        data: resData
                    }
                };
            })
            .catch((err: AjaxError) => {
                message.error('未找到用户');
                return Observable.of({
                    type: adminActions.GET_ACCOUNT.FAIL,
                    payload: err.xhr.response,
                    error: true
                });
            })
        );

const chargeEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionChargeRequestType>) =>
    action$
        .ofType(adminActions.RECHARGE.REQUEST)
        .mergeMap((action: ActionChargeRequestType) =>
            ajax.get(`${API_ROOT}/account/prepay/${action.payload.userId}/${action.payload.amount}`)
                .map(() => {
                    message.success('充值成功！');
                    return {
                        type: adminActions.GET_ACCOUNT.REQUEST,
                        payload: {
                            name: action.payload.name
                        }
                    };
                })
                .catch(() => {
                    message.error('充值失败！');
                    return Observable.of({
                        type: adminActions.RECHARGE.FAIL,
                    });
                })
        );

const getBookAddressEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionBookAddress>) =>
    action$
        .ofType(adminActions.GET_ISBN_BOOK_LIST.REQUEST)
        .mergeMap((action: ActionBookAddress) =>
            ajax.post(`${API_ROOT}/order/query/ongoing`, {
                isbn: action.payload.isbn,
                fromDate: action.payload.time[0].format(DATE_FORMAT),
                toDate: action.payload.time[1].format(DATE_FORMAT)
            },{
                'Content-Type': 'application/json',
            })
                .map((res) => {
                    const resData =res.response.payload as {[propsName: string]: StateBookAddress}
                    return {
                        type: adminActions.GET_ISBN_BOOK_LIST.SUCCESS,
                        payload: Object.values(resData)
                    };
                })
        );

const confirmSentEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ConfirmSentParamAction>) =>
    action$
        .ofType(adminActions.CONFIRM_SENT.REQUEST)
        .mergeMap((action: ConfirmSentParamAction) => ajax.get(
            `${API_ROOT}/order/delivering/${action.payload.order_id}`,
            ).map(() => {
                const {time, nickname} = action.payload.requestParams
                return {
                    type: adminActions.BOOKLIST.REQUEST,
                    payload: {
                        fromDate: time[0].format(DATE_FORMAT),
                        toDate: time[1].format(DATE_FORMAT),
                        nickname,
                        status: 'selling',
                    }
                }
            })
        )

const changeDeliveriedCountEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionChangeDeliverdCountType>) =>
    action$
        .ofType(adminActions.CHANGE_DELIVERIED_QUANTITY.REQUEST)
        .mergeMap((action: ActionChangeDeliverdCountType) => {
            const {orderId, quantity, userId} = action.payload
            return ajax.get(
                `${API_ROOT}/order/detail/deliveried/${userId}/${orderId}/${quantity}`,
            ).map(() => {
                return {
                    type: adminActions.GET_ISBN_BOOK_LIST.REQUEST,
                    payload: {...action.payload.requestParams}
                }
            })
        })

const queryBookList: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionBookListRequestType>) =>
    action$
        .ofType(adminActions.BOOKLIST.REQUEST)
        .mergeMap((action: ActionBookListRequestType) => {
            const {status, fromDate, toDate, nickname} = action.payload
            return ajax.post(
                    `${API_ROOT}${orderQueryMap[status]}`,
                    {
                        fromDate,
                        toDate,
                        nickName: nickname,
                    },
                    {
                        'Content-Type': 'application/json',
                    }
                )
                    .map((res: AjaxResponse) => {
                        return {
                            type: adminActions.BOOKLIST.SUCCESS,
                            payload: {
                                status: action.payload.status,
                                value: Object.values(res.response.payload)
                            }
                        }
                    })
        })

const querySellerList: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(adminActions.SELLER_LIST.REQUEST)
        .mergeMap(() => {
            return ajax.get(
                `${API_ROOT}/user/query/all`,
            ).map((res: AjaxResponse) => {
                return {
                    type: adminActions.SELLER_LIST.SUCCESS,
                    payload: Object.values(res.response.payload)
                }
            })
        })

const requestResetPassword: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(adminActions.RESET_PASSWORD.REQUEST)
        .mergeMap((action: ResetPasswordAction) => {
            return ajax.post(
                `${API_ROOT}/user/password/update_by_name`,
                action.payload,
                {
                    'Content-Type': 'application/json',
                },
            ).catch(() => {
                message.error('修改密码失败！')
                return Observable.of({
                    type: adminActions.RESET_PASSWORD.FAIL,
                })
            }).
            map((res: AjaxResponse) => {
                if(res.status === 200) {
                    message.success('修改密码成功！')
                    return {type: adminActions.RESET_PASSWORD.SUCCESS};
                }
                return {type: adminActions.RESET_PASSWORD.FAIL}
            })
        })

export default combineEpics(loginEpic, chargeEpic, getBookAddressEpic,
    confirmSentEpic, changeDeliveriedCountEpic, queryBookList, querySellerList, requestResetPassword);