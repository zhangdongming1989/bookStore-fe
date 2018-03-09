declare interface LoginInputType {
    username: string;
    password: string;
}

declare interface RegisterInputType {
    username: string;
    nickname: string;
    realname: string;
    gender: 'male' | 'female';
    email: string;
    password: string;
    pwdquestion: string;
    pwdanswer: string;
    phone: string;
    qq: string;
}

declare type CurrentUserType = {
    username: string;
    nickname: string;
    realname: string;
    gender: 'male' | 'female';
    email: string;
    password: string;
    pwdquestion: string;
    pwdanswer: string;
    phone: string;
    qq: string;
    is_admin: boolean;
} | null;

declare enum Status {
    ok = 'ok',
    fail = 'fail',
}

declare interface StateLoginStatusType {
    status: Status;
    payload: object | null;
    message?: string;
}

declare interface StateRegisterStatusType {
    status: Status;
    payload: object | null;
    message?: string;
}

declare interface StateLoginStatusFailType {
    status: Status;
    payload: object | null;
    message: string;
}

declare interface StateCurrentUserType {
    username: string;
    nickname: string;
    realname: string;
    gender: 'male' | 'female';
    email: string;
    password: string;
    pwdquestion: string;
    pwdanswer: string;
    phone: string;
    qq: string;
}

declare interface StateAccountTypes {
    readonly loginStatus: StateLoginStatusType | null;
    readonly registerStatus: StateRegisterStatusType | null;
}