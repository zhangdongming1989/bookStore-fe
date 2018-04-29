import { adminActions } from './actions';
import { SellerItem, StateAdminType, StateBookAddress } from './types';

// tslint:disable no-debugger

export const initialState: StateAdminType = {
    accountInfoList: {},
    bookAddressList: [],
    bookList: {
        selling: [],
        sold: [],
    },
    sellerList: [],
};

export const adminReducers = (
    state = initialState,
    action: {type: string, payload: Object, [propName: string]: Object}
) => {
    const { payload } = action;
    if (action.type === adminActions.GET_ACCOUNT.SUCCESS) {
        const {name, data} = payload as {name: string, data: string};
        return {
            ...state,
            accountInfoList: {
                ...state.accountInfoList,
                [name]: data
            },
        };
    }
    if (action.type === adminActions.GET_ISBN_BOOK_LIST.SUCCESS) {
       const bookAddressList = payload as StateBookAddress[];
       return {
           ...state,
           bookAddressList,
       };
    }

    if (action.type === adminActions.BOOKLIST.SUCCESS) {
        // tslint:disable-next-line
        const { payload } = action as
            {
                type: string,
                payload: {status: ActionOrderStatus, value: BookListType}
            };
        return {
            ...state,
            bookList: {
                ...state.bookList || {},
                [payload.status]: payload.value,
            }
        };
    }

    if (action.type === adminActions.SELLER_LIST.SUCCESS) {
      // tslint:disable-next-line
        const { payload } = action as {
            type: string;
            payload: SellerItem[]
        };
        return {
            ...state,
            sellerList: payload
        };
    }

    return state;
};