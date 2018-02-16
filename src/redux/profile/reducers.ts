import { profileActions } from './actions';

// tslint:disable no-debugger

export const initialState: StateProfileTypes = {
    currentUser: null,
};

export const profileReducer = (
    state = initialState,
    action: {type: string, payload: Object, [propName: string]: Object}
) => {
    const { payload } = action;
    if (action.type === profileActions.BASIC.SUCCESS) {
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

    return state;
};