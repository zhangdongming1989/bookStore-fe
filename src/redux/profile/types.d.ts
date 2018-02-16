declare interface StateProfileTypes {
    readonly currentUser: StateCurrentUserType | null;
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