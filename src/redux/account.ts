import { createAction } from 'typesafe-actions';

export const accountActions = {
    login: createAction('REQUEST_LOGIN', ( username: string, password: string) => ({
        type: 'REQUEST_LOGIN',
        payload: {
            username,
            password,
        }
    }))
};

export type State = {
    readonly counter: number,
};

export const initialState: State = {
    counter: 0,
};

export const accountReducer = (state = initialState, action: {type: string, payload?: number}) => {
    if (action.type === 'ADD') {
        return {
            ...state,
            counter: state.counter + 1,
    };
    }
    return state;
};