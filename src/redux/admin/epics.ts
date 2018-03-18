import { AjaxError, AjaxResponse, Observable } from 'rxjs/Rx';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { message } from 'antd';
import { ajax } from 'rxjs/observable/dom/ajax';
import { adminActions } from './actions';
import { API_ROOT, DATE_FORMAT } from '../../constants';
import { ActionType, EpicType } from '../types';
import { ActionBookAddress, ActionChargeRequestType, ActionGetAccountType, StateBookAddress } from './types';

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

export default combineEpics(loginEpic, chargeEpic, getBookAddressEpic);