/// <reference path="../types.d.ts" />
import { AjaxResponse } from 'rxjs/Rx';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { ActionType, EpicType } from '../types';
import { profileActions } from './actions';
import { API_ROOT } from '../../constants';

// tslint:disable
const currentUserEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(profileActions.BASIC.REQUEST)
        .mergeMap(() => ajax.get(
            `${API_ROOT}/profile/query`,
            )
                .map((res: AjaxResponse) => {
                    return {type: profileActions.BASIC.SUCCESS, payload: res.response.payload};
                })
        );
const accountInfoEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(profileActions.ACCOUNTINFO.REQUEST)
        .mergeMap(() => ajax.get(
            `${API_ROOT}/account/query`,
            )
                .map((res: AjaxResponse) => {
                    return {type: profileActions.ACCOUNTINFO.SUCCESS, payload: res.response.payload};
                })
        );

const logoutEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(profileActions.LOGOUT.REQUEST)
        .mergeMap(() => ajax.get(
            `${API_ROOT}/logout`,
            )
                .map(() => {
                    return {type: profileActions.LOGOUT.SUCCESS};
                })
        );

const queryBookList: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(profileActions.BOOKLIST.REQUEST)
        .mergeMap(() => ajax.post(
             `${API_ROOT}/order/query`,
            {
                orderId: 12,
            },
            {
                'Content-Type': 'application/json',
            }
        )
            .map((res: AjaxResponse) => {
                return {
                    type: profileActions.BOOKLIST.SUCCESS,
                    payload: Object.values(res.response.payload)
                }
            })
        )

const queryBookDetail: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$.
        ofType(profileActions.BOOKLIST_DETAIL.REQUEST)
        .mergeMap((action: ActionType) => ajax.get(
            `${API_ROOT}/order/detail/${action.payload}`
            )
            .map((res) => {
                return {
                    type: profileActions.BOOKLIST_DETAIL.SUCCESS,
                    payload: {
                        orderId: action.payload,
                        list: Object.values(res.response.payload)
                    }
                }
            })
        )


export default combineEpics(currentUserEpic, logoutEpic, accountInfoEpic, queryBookList, queryBookDetail);