import { cartActions } from './actions';

// tslint:disable no-debugger
export const initialState: StateCartTypes = {
    cart: [],
};

export const cartReducer = (
    state = initialState,
    action: {type: string, payload: Object, [propName: string]: Object}
) => {
    if (action.type === cartActions.GET.SUCCESS) {
        const { payload } = action;
        return {
            ...state,
            cart: payload,
        };
    }

    return state;
};