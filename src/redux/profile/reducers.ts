import { profileActions } from './actions';

// tslint:disable no-debugger
export const initialState: StateProfileTypes = {
    currentUser: null,
    accountInfo: null,
    accountInfoLog: null,
    bookList: null,
    bookListDetail: {},
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
        const { payload } = action;
        return {
            ...state,
            bookList: payload
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

    return state;
};