import { adminActions } from './actions';
import { StateAdminType, StateBookAddress } from './types';

// tslint:disable no-debugger

export const initialState: StateAdminType = {
    accountInfoList: {},
    bookAddressList: [],
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

    return state;
};