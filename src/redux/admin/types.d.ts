import * as Moment from 'moment';
export interface ActionGetAccountType {
    type: string;
    payload: {
        name: string;
    };
}

export interface StateAdminType {
    accountInfoList: {
        [propsName: string]: StateAccountInfoType
    };
    bookAddressList: StateBookAddress[];
}

export interface ActionChargeRequestType {
    type: string;
    payload: {
      userId: string;
      amount: number;
      name: string;
    };
}

export interface ActionBookAddress {
    type: string;
    payload: {
      isbn: string;
      time: [Moment.Moment, Moment.Moment]
    };
}

export interface StateBookAddress {
    actual_price: number;
    book_id: string;
    book_name: string;
    created_at: string;
    deliveried_quantity: number;
    discount: number;
    isbn: string;
    order_id: string;
    order_quantity: number;
    origin_price: number;
    supplier_id: string;
    supplier_name: string;
    user_id: number;
    address: string;
    consignee: string;
    post_code: string;
    phone: string;
}