/// <reference path="../types.d.ts" />
import { AjaxError, AjaxResponse, Observable } from 'rxjs/Rx';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { ActionType, EpicType } from '../types';
import { profileActions } from './actions';
import { API_ROOT } from '../../constants';

const orderQueryMap = {
    buy: {
        selling: '/order/query/buying',
        sold: '/order/query/bought',
    },
    sell: {
        // todo: change to selling sold
        selling: '/order/query/selling',
        sold: '/order/query/sold',
    }
};
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

// const accountInfoEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
//     action$
//         .mergeMap(() => ajax.get(
//             `${API_ROOT}/account/query`,
//             )
//         );
//
// const accountInfoLogEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
//     action$
//         .mergeMap(() => ajax.get(
//             `${API_ROOT}/accountlog/query`,
//             )
//         );

const accountInfoEpic: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(profileActions.ACCOUNTINFO.REQUEST)
        .mergeMap(() => {
            return Observable.forkJoin(
                ajax.get(`${API_ROOT}/account/query`).map((res:AjaxResponse) => res.response.payload)
                ,
                ajax.get(`${API_ROOT}/accountlog/query`)
                    .map((res:AjaxResponse) => Object.values(res.response.payload))
            )
                .map(([accountInfo, accountInfoLog]: [StateAccountInfoType, StateAccountInfoLogType[]]) =>  {
                    return {
                        type: profileActions.ACCOUNTINFO.SUCCESS,
                        payload: {
                            accountInfo,
                            accountInfoLog,
                        }
                    }
                })
        })



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

const queryBookList: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionOrderType>) =>
    action$
        .ofType(profileActions.BOOKLIST.REQUEST)
        .mergeMap((action: ActionOrderType) => ajax.post(
             `${API_ROOT}${orderQueryMap[action.payload.type][action.payload.status]}`,
            {},
            {
                'Content-Type': 'application/json',
            }
        )
            .map((res: AjaxResponse) => {
                return {
                    type: profileActions.BOOKLIST.SUCCESS,
                    payload: {
                        type: action.payload.type,
                        status: action.payload.status,
                        value: Object.values(res.response.payload)
                    }
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

const queryAddress: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$.
        ofType(profileActions.ADDRESS.REQUEST)
        .mergeMap(() => ajax.get(
            `${API_ROOT}/address/query`
        ))
        .map(res => {
            return {
                type: profileActions.ADDRESS.SUCCESS,
                payload: res.response.payload
            }
        })

const addAddress: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$.
         ofType(profileActions.ADD_ADDRESS.REQUEST)
        .mergeMap((action: ActionType) =>
            ajax.post(
                `${API_ROOT}/address/add`,
                action.payload,
                {'Content-Type': 'application/json'}
                )
        )
        .mapTo({type: profileActions.ADDRESS.REQUEST});

const deleteAddress: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$.
    ofType(profileActions.DELETE_ADDRESS.REQUEST)
        .mergeMap((action: ActionType) =>
            ajax.get(
                `${API_ROOT}/address/remove/${action.payload}`,
            )
        )
        .mapTo({type: profileActions.ADDRESS.REQUEST});

const setDefaultAddress: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$.
    ofType(profileActions.SETDEFAULT_ADDRESS.REQUEST)
        .mergeMap((action: ActionType) =>
            ajax.get(
                `${API_ROOT}/address/setdefault/${action.payload}`,
            )
        )
        .mapTo({type: profileActions.ADDRESS.REQUEST});

const upload: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionUploadType>) =>
    action$
        .ofType(profileActions.UPLOAD_REQUEST.REQUEST)
        .mergeMap((action: ActionUploadType) => {
            const formData = new FormData;
            formData.append('file', action.payload);
            return ajax.post(
                `${API_ROOT}/sell/upload`,
                formData,
                {
                    enctype: 'multipart/form-data',
                })
                .map((res: AjaxResponse) => {
                    return {type: profileActions.UPLOAD_REQUEST.SUCCESS, payload: res.response};
                })
                .catch((err: AjaxError) =>
                    Observable.of({
                        type: profileActions.UPLOAD_REQUEST.FAIL,
                        payload: err.xhr.response,
                    })
                )}
        );

const storeBook: Epic<ActionType, EpicType> = (action$: ActionsObservable<ActionType>) =>
    action$
        .ofType(profileActions.STORE_BOOK.REQUEST)
        .mergeMap(() => ajax.get(
            `${API_ROOT}/book/supplied`,
            )
                .map((res: AjaxResponse) => {
                    return {type: profileActions.STORE_BOOK.SUCCESS, payload: Object.values(res.response.payload)};
                })
        );

export default combineEpics(
    currentUserEpic,
    logoutEpic,
    accountInfoEpic,
    queryBookList,
    queryBookDetail,
    queryAddress,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    upload,
    storeBook,
);