interface BookListObjectType {
    buy: {
        selling: BookListType;
        sold: BookListType;
    };
    sell: {
        selling: BookListType;
        sold: BookListType;
    };
}

interface UploadType {
    loading: boolean;
    result: string;
    message: string;
}

interface ActionUploadType {
    type: string;
    payload: File;
}

declare interface StateProfileTypes {
    readonly currentUser: StateCurrentUserType | null;
    readonly accountInfo: StateAccountInfoType | null;
    readonly accountInfoLog: StateAccountInfoLogType[] | null;
    readonly bookListObject: BookListObjectType;
    readonly bookListDetail: BookListDetailType | {};
    readonly address: StateAddressType[] | null;
    readonly upload: UploadType;
    readonly storeBookList: StoreBookItemType[];
    readonly orderAddressMap: {
        [propsName: string]: StateOrderAddressType;
    };
    readonly sellerList: SellerListType[];
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
    is_admin: boolean;
}

declare interface StateUserType {
    username: string;
    nickname: string;
    realname: string;
    gender: 'male' | 'female';
    email: string;
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

declare interface StoreBookItemType extends StateSearchResultType {
    discount: number;
}

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

declare type ActionOrderStatus = 'selling' | 'sold';
declare type ActionOrderTypeType = 'buy' | 'sell';
declare interface ActionOrderType {
    type: string;
    payload: {
        type: ActionOrderTypeType;
        status: ActionOrderStatus;
    };
}

declare interface StateOrderAddressType {
    post_code: number;
    address: string;
    phone: number;
    order_id: string;
    consignee: string;
}

declare interface SellerListType {
    nickname: string;
    user_id: number;
}