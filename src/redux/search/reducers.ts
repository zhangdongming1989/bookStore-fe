import { searchActions } from './actions';

// tslint:disable no-debugger
export const initialState: StateSearchTypes = {
    dataList: [],
};

export const searchReducer = (
    state = initialState,
    action: {type: string, payload: Object, [propName: string]: Object}
) => {
    if (action.type === searchActions.GET.SUCCESS) {
        const { payload } = action;
        return {
            ...state,
            dataList: payload,
        };
    }

    return state;
};