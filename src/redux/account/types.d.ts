declare interface LoginInputType {
    username: string;
    password: string;
}

declare enum Status {
    ok = 'ok',
    fail = 'fail',
}

declare interface StateLoginStatusType {
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
    // todo: 其他用户信息字段
    name: string;
}

declare interface StateAccountTypes {
    readonly loginStatus: StateLoginStatusType | null;
    readonly currentUser: StateCurrentUserType | null;
}