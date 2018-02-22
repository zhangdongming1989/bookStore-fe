// import { ActionType } from '../types';

export const searchActions = {
    GET: {
        REQUEST: 'SEARCH_GET_REQUEST',
        SUCCESS: 'SEARCH_GET_SUCCESS',
    },
};

export const requestSearch = (type: searchType, q: string) => {
    return {
        type: searchActions.GET.REQUEST,
        payload: {
            type,
            q,
        }
    };
};