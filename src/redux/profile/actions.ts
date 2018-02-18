export const profileActions = {
    BASIC: {
        REQUEST: 'PROFILE_BASIC_REQUEST',
        SUCCESS: 'PROFILE_BASIC_SUCCESS',
        FAIL: 'PROFILE_BASIC_FAIL',
        CLEAR: 'PROFILE_BASIC_CLEAR',
    },
    LOGOUT: {
        REQUEST: 'PROFILE_LOGOUT_REQUEST',
        SUCCESS: 'PROFILE_LOGOUT_SUCCESS',
    },
    ACCOUNTINFO: {
        REQUEST: 'PROFILE_ACCOUNTINFO_REQUEST',
        SUCCESS: 'PROFILE_ACCOUNTINFO_SUCCESS',
    },
    BOOKLIST: {
        REQUEST: 'PROFILE_BOOKLIST_REQUEST',
        SUCCESS: 'PROFILE_BOOKLIST_SUCCESS',
    },
    BOOKLIST_DETAIL: {
        REQUEST: 'PROFILE_BOOKLIST_DETAIL_REQUEST',
        SUCCESS: 'PROFILE_BOOKLIST_DETAIL_SUCCSS',
    }
};

export const requestProfile = () => {
    return {
        type: profileActions.BASIC.REQUEST,
    };
};

export const requestLogout = () => {
    return {
        type: profileActions.LOGOUT.REQUEST,
    };
};

export const requestAccountInfo = () => {
    return {
        type: profileActions.ACCOUNTINFO.REQUEST,
    };
};

export const requestBookList = () => {
    return {
        type: profileActions.BOOKLIST.REQUEST,
    };
};

export const requestBookListDetail = (orderId: string) => {
    return {
        type: profileActions.BOOKLIST_DETAIL.REQUEST,
        payload: orderId,
    };
};
