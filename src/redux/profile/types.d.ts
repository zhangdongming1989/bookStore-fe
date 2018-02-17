declare interface StateProfileTypes {
    readonly currentUser: StateCurrentUserType | null;
    readonly accountInfo: StateAccountInfoType | null;
    readonly bookList: BookListType | null;
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

declare interface StateAccountInfoType {
    user_id: string;
    balance: string | null;
    bonus_point: string | null;
    discount: string;
}

declare type BookItemType = {
    user_id: string,
    order_id: string,
    quantity: string,
    origin_cost: string,
    pay_status: string,
    order_status: string,
    actual_cost: string,
    delivery_status: string,
};

declare type BookListType = BookItemType[];
