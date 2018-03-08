import { profileActions } from './actions';
import { message } from 'antd';

// tslint:disable no-debugger
export const initialState: StateProfileTypes = {
    currentUser: null,
    accountInfo: null,
    accountInfoLog: null,
    bookListObject: {
        buy: {
            selling: [],
            sold: [],
        },
        sell: {
            selling: [],
            sold: [],
        }

    },
    bookListDetail: {},
    address: null,
};

export const profileReducer = (
    state = initialState,
    action: {type: string, payload: Object, [propName: string]: Object}
) => {
    if (action.type === profileActions.BASIC.SUCCESS) {
        const { payload } = action;
        return {
            ...state,
            currentUser: payload,
        };
    }
    if (action.type === profileActions.BASIC.FAIL) {
        return {
            ...state,
            currentUser: null
        };
    }
    if (action.type === profileActions.LOGOUT.SUCCESS) {
        return initialState;
    }

    if (action.type === profileActions.ACCOUNTINFO.SUCCESS) {
        const { accountInfo, accountInfoLog } = action.payload as AccountInfoPayloadType;
        return {
            ...state,
            accountInfo,
            accountInfoLog,
        };
    }

    if (action.type === profileActions.BOOKLIST.SUCCESS) {
        const { payload } = action as
            {
                type: string,
                payload: {type: ActionOrderTypeType, status: ActionOrderStatus, value: StateBookListItemType[]}
            };
        return {
            ...state,
            bookListObject: {
                ...state.bookListObject || {},
                [payload.type]: {
                    ...state.bookListObject[payload.type],
                    [payload.status]: payload.value,
                },
            }
        };
    }

    if ( action.type === profileActions.BOOKLIST_DETAIL.SUCCESS ) {
        const { payload } = action as BookListDetailActionType;
        const { orderId, list } = payload;
        return {
            ...state,
            bookListDetail: {
                ...state.bookListDetail,
                [orderId]: list
            }
        };
    }

    if (action.type === profileActions.ADDRESS.SUCCESS) {
        const { payload } = action;
        return {
            ...state,
            address: payload,
        };
    }

    if (action.type === profileActions.ADD_ADDRESS.SUCCESS) {
        const {payload} = action;
        message.success('添加地址成功！');
        return {
            ...state,
            address: [
                ...(state.address || []),
                payload,
            ]

        };
    }

    return state;
};