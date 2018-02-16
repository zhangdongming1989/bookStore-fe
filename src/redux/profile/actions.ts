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