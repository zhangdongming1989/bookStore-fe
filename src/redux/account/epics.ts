/// <reference path="../types.d.ts" />
/// <reference path="./types.d.ts" />
import { AjaxError, AjaxResponse, Observable } from 'rxjs/Rx';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { accountActions } from './actions';
import { API_ROOT } from '../../constants';
import { ActionType, EpicType } from '../types';

// tslint:disable no-any
const loginEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(accountActions.LOGIN.REQUEST)
        .mergeMap((action: ActionType) => ajax.post(
            `${API_ROOT}/login`,
            {
                ...action.payload,
            },
            {
                'Content-Type': 'application/json',
            })
            .map((res: AjaxResponse) => {
                return {type: accountActions.LOGIN.SUCCESS, payload: res.response};
            })
            .catch((err: AjaxError) =>
                Observable.of({
                    type: accountActions.LOGIN.FAIL,
                    payload: err.xhr.response,
                    error: true
                })
        )
    );

const registerEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(accountActions.REGISTER.REQUEST)
        .mergeMap((action: ActionType) => ajax.post(
            `${API_ROOT}/register`,
            {
                ...action.payload,
            },
            {
                'Content-Type': 'application/json',
            })
            .map((res: AjaxResponse) => {
                return {type: accountActions.REGISTER.SUCCESS, payload: res.response};
            })
            .catch((err: AjaxError) =>
                Observable.of({
                    type: accountActions.REGISTER.FAIL,
                    payload: err.xhr.response,
                    error: true
                })
            )
        );

const profileEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(accountActions.PROFILE.REQUEST)
        .mergeMap(() => ajax.get(
            `${API_ROOT}/account/query`,
        )
            .map((res: AjaxResponse) => {
                return {type: accountActions.PROFILE.SUCCESS, payload: res.response};
            })
        );

export default combineEpics(loginEpic, profileEpic, registerEpic);