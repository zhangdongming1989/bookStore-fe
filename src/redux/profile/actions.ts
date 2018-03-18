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
    },
    UPLOAD_REQUEST: {
        REQUEST: 'UPLOAD_REQUEST',
        SUCCESS: 'UPLOAD_SUCCESS',
        FAIL: 'UPLOAD_FAIL',
    },
    STORE_BOOK: {
        REQUEST: 'STORE_BOOK_REQUEST',
        SUCCESS: 'STORE_BOOK_SUCCESS',
        FAIL: 'STORE_BOOK_FAIL',
    },
    CONFIRM_DELIVER: {
        REQUEST: 'CONFIRM_DELIVER_REQUEST',
        SUCCESS: 'CONFIRM_DELIVER_SUCCESS',
        FAIL: 'CONFIRM_DELIVER_FAIL',
    },
    CONFIRM_SENT: {
        REQUEST: 'CONFIRM_SENT_REQUEST',
        SUCCESS: 'CONFIRM_SENT_SUCCESS',
        FAIL: 'CONFIRM_SENT_FAIL',
    },
    QUERY_ADDRESS_BY_ORDER: {
        REQUEST: 'QUERY_ADDRESS_BY_ORDER_REQUEST',
        SUCCESS: 'QUERY_ADDRESS_BY_ORDER_SUCCESS',
        FAIL: 'QUERY_ADDRESS_BY_ORDER_FAIL',
    },
    QUERY_ALL_SELLER_LIST: {
        REQUEST: 'QUERY_ALL_SELLER_LIST_REQUEST',
        SUCCESS: 'QUERY_ALL_SELLER_LIST_SUCCESS',
        FAIL: 'QUERY_ALL_SELLER_LIST_FAIL',
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

export const requestBookList = (type: ActionOrderTypeType = 'buy' , status: ActionOrderStatus = 'selling') => {
    return {
        type: profileActions.BOOKLIST.REQUEST,
        payload: {
            type,
            status,
        }
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

export const uploadRequest = (file: File) => {
    return {
        type: profileActions.UPLOAD_REQUEST.REQUEST,
        payload: file,
    };
};

export const storeBookRequest = () => {
    return {
        type: profileActions.STORE_BOOK.REQUEST
    };
};

export const requestConfirmOrder = (orderId: string) => {
    return {
        type: profileActions.CONFIRM_DELIVER.REQUEST,
        payload: {
            orderId,
        },
    };
};

export const requestConfirmSent = (orderId: string) => {
    return {
        type: profileActions.CONFIRM_SENT.REQUEST,
        payload: {
            orderId,
        },
    };
};

export const requestAddressByOrder = (orderId: string) => {
    return {
        type: profileActions.QUERY_ADDRESS_BY_ORDER.REQUEST,
        payload: orderId,
    };
};

export const queryAllSellerList = () => {
    return {
        type: profileActions.QUERY_ALL_SELLER_LIST.REQUEST,
    };
};
