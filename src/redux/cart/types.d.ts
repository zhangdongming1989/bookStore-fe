declare interface StateCartType {
    discount: number;
    user_id: string;
    book_id: string;
    id: string;
    origin_price: number;
    supplier: string;
    total_price: number;
    isbn: string;
    book_name: string;
    actual_price: number;
    quantity: number;
    order_quantity: number;

}
// add 带添加的数量， update 更新后的数量 delete 整条删掉
declare interface UpdateBookActionType {
    book_id: string;
    quantity?: number;
    cart_id: string;
    action: 'add' | 'update' | 'delete';
}

declare interface StateCartTypes {
    cart: StateCartType[];
}

declare interface ActionCreateCartType {

}