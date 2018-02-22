declare enum searchType {
    isbn = 'isbn',
    name = 'name',
}

declare type SearchRequestAction = {
    type: string;
    payload: {
        type: searchType;
        q: string;
    };
};

declare interface StateSearchResultType {
    author: string | null;
    description: string | null;
    id: string;
    isbn: string | null;
    name: string;
    press: string | null;
    price: string;
    quantity: string;
    supplier: string | null;
}

declare type StateSearchResultListType = StateSearchResultType[];

declare interface StateSearchTypes {
    dataList: StateSearchResultListType;
}
