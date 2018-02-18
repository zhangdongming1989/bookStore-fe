declare interface StateProfileTypes {
    readonly currentUser: StateCurrentUserType | null;
    readonly accountInfo: StateAccountInfoType | null;
    readonly bookList: BookListType | null;
    readonly bookListDetail: BookListDetailType | {};
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
