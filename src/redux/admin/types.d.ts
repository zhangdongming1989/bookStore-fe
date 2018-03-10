declare interface ActionGetAccountType {
    type: string;
    payload: {
        name: string;
    };
}

declare interface StateAdminType {
    accountInfoList: {
        [propsName: string]: StateAccountInfoType
    };
}

declare interface ActionChargeRequestType {
    type: string;
    payload: {
      userId: string;
      amount: number;
      name: string;
    };
}