interface BookListObjectType {
    closed: BookListType;
    return: BookListType;
    default: BookListType;
}

declare interface StateProfileTypes {
    readonly currentUser: StateCurrentUserType | null;
    readonly accountInfo: StateAccountInfoType | null;
    readonly accountInfoLog: StateAccountInfoLogType[] | null;
    readonly bookListObject: BookListObjectType;
    readonly bookListDetail: BookListDetailType | {};
    readonly address: StateAddressType[] | null;
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
    user_id?: string,
    order_id: string,
    quantity?: string,
    origin_cost: string,
    pay_status: string,
    order_status: string,
    actual_cost: string,
    delivery_status: string,
    time: string;
};

declare type StateBookItemDetail = {
    isbn: string,
    order_quantity: string,
    book_name: string,
    origin_price: string,
    discount: string,
    warehouse: string,
    actual_price: string,
    order_id: string,
    deliveried_quantity: string
};

declare type BookListType = BookItemType[];
declare type StateBookListItemType = {
    [propsName: string]: BookListType;
};

declare type BookListDetailType = StateBookItemDetail[];
declare type StateBookListDetailType = {
  [propsName: string]: BookListDetailType;
};

declare type BookListDetailActionType = {
    type: string;
    payload: {
        orderId: string;
        list: BookListDetailType;
    }
};

declare type StateAccountInfoLogType = {
    created_at: string,
    current_balance: string,
    amount: string,
    type: string,
};

declare interface AccountInfoPayloadType {
    accountInfo: StateAccountInfoType;
    accountInfoLog: StateAccountInfoLogType[];
}

declare interface ItemProps {
    key: string;
    value: string;
}

declare type StateAddressType = {
    id: string;
    user_id: string;
    name: string;
    address: string;
    post_code: string;
    phone: string;
    is_default: string;
};

declare type StateAddAddressType = {
    name: string;
    address: string;
    post_code: string;
    phone: string;
};

declare type ActionOrderPayloadType = 'closed' | 'return' | 'default';
declare interface ActionOrderType {
    type: string;
    payload: ActionOrderPayloadType;
}
