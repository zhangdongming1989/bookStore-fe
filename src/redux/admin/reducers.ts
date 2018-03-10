import { adminActions } from './actions';

// tslint:disable no-debugger

export const initialState: StateAdminType = {
    accountInfoList: {}
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

    return state;
};