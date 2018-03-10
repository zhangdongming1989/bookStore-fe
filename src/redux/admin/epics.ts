import { AjaxError, AjaxResponse, Observable } from 'rxjs/Rx';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { message } from 'antd';
import { ajax } from 'rxjs/observable/dom/ajax';
import { adminActions } from './actions';
import { API_ROOT } from '../../constants';
import { ActionType, EpicType } from '../types';

// tslint:disable no-any
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
                        type: adminActions.RECHARGE.SUCCESS,
                    };
                })
                .catch(() => {
                    message.error('充值失败！');
                    return Observable.of({
                        type: adminActions.RECHARGE.FAIL,
                    });
                })
        );

export default combineEpics(loginEpic, chargeEpic);