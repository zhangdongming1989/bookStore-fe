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
    },
    ADDRESS: {
        REQUEST: 'PROFILE_ADDRESS_REQUEST',
        SUCCESS: 'PROFILE_ADDRESS_SUCCESS',
    },
    ADD_ADDRESS: {
        REQUEST: 'PROFILE_ADD_ADDRESS_REQUEST',
        SUCCESS: 'PROFILE_ADD_ADDRESS_SUCCESS',
        FAIL: 'PROFILE_ADD_ADDRESS_FAIL',
    },
    DELETE_ADDRESS: {
        REQUEST: 'PROFILE_DELETE_ADDRESS_REQUEST',
        SUCCESS: 'PROFILE_DELETE_ADDRESS_SUCCESS',
    },
    SETDEFAULT_ADDRESS: {
        REQUEST: 'SETDEFAULT_ADDRESS_REQUEST',
        SUCCESS: 'SETDEFAULT_ADDRESS_SUCCESS',
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

export const requestAddress = () => {
    return {
        type: profileActions.ADDRESS.REQUEST,
    };
};

export const requestAddAddress = (payload: StateAddAddressType) => {
    return {
        type: profileActions.ADD_ADDRESS.REQUEST,
        payload,
    };
};

export const requestDeleteAddress = (id: string) => {
    return {
        type: profileActions.DELETE_ADDRESS.REQUEST,
        payload: id,
    };
};

export const requestSetDefaultAddress = (id: string) => {
    return {
        type: profileActions.SETDEFAULT_ADDRESS.REQUEST,
        payload: id,
    };
};
