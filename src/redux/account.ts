import { createAction } from 'typesafe-actions';

export const accountActions = {
    account: createAction('REQUEST_LOGIN', ( counter: number ) => ({
        type: 'REQUEST_LOGIN',
        payload: counter,
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