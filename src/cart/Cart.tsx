import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { InjectedRouter } from 'react-router';
import { RootState } from '../redux/types';
import { Table, InputNumber, Button, Select, Card } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { actionUpdateCart, requestCreateOrder } from '../redux/cart/actions';
import { requestAddress } from '../redux/profile/actions';
import './index.css';
const Option = Select.Option;

//tslint:disable
interface CartProps {
    cartData: StateCartType[];
    dispatch: Dispatch<() => {}>;
    addresses: StateAddressType[];
    currentUser: StateCurrentUserType;
    router: InjectedRouter
}

class Cart extends React.Component<CartProps> {
    state = {
        selectedRowKeys: [],
        selectedAddress: -1,
    }

    componentDidMount() {
        const { dispatch, currentUser } = this.props;
        if(!currentUser) return;
        this.checkIfNeedRedirect()
        dispatch(requestAddress());
        this.selectAllBook();
    }

    componentWillReceiveProps(nextProps: CartProps) {
        const {addresses: nextAddresses = [], cartData: nextCart} = nextProps
        this.checkIfNeedRedirect(nextProps);
        const {addresses = [], cartData, currentUser} = this.props
        if(!currentUser) return;
        if(addresses.length === 0 && nextAddresses.length > 0) {
            this.setState({
                selectedAddress: (nextAddresses.find(address => Boolean(address.is_default))|| nextAddresses[0]).id
            })
        }
        if(cartData.length === 0 && nextCart.length > 0) {
            this.selectAllBook(nextProps);
        }
    }

    checkIfNeedRedirect = (props: CartProps = this.props) => {
        const {currentUser, router} = props;
        if (!currentUser) {
            router.push('/');
        }
    }

    selectAllBook = (props = this.props) => {
        const {cartData} = props;
        if(cartData.length > 0) {
            this.setState({selectedRowKeys: cartData.map(cart => cart.id)})
        }
    }

    onSelectChange = (selectedRowKeys: string[]) => {
        // this.setState({ selectedRowKeys });
    }

    onChangeQuantity = (val: number, item: StateCartType) => {
        const {dispatch} = this.props
        dispatch(actionUpdateCart({book_id: item.book_id, quantity: val, cart_id: item.id, action: 'update'}))
    }

    handleDelete = (item: StateCartType) => {
        const {dispatch} = this.props;
        dispatch(actionUpdateCart({book_id: item.book_id, action: 'delete', cart_id: item.id}))
    }

    handleCreateOrder = () => {
        const {selectedAddress} = this.state;
        const {dispatch} = this.props;
        dispatch(requestCreateOrder(selectedAddress))

    }

    render() {
        const { cartData, addresses } = this.props;
        const { selectedRowKeys, selectedAddress } = this.state;
        const columns: ColumnProps<StateCartType>[] = [
            {
                key: 'supplier',
                title: '货源',
                dataIndex: 'supplier',
            },
            {
                key: 'isbn',
                title: 'ISBN',
                dataIndex: 'isbn',
            },
            {
                key: 'book_name',
                title: '书名',
                dataIndex: 'book_name',
            },
            {
                key: 'origin_price',
                title: '原价',
                dataIndex: 'origin_price',
            },
            {
                key: 'discount',
                title: '折扣',
                dataIndex: 'discount',
            },
            {
                key: 'actual_price',
                title: '会员价',
                dataIndex: 'actual_price',
            },
            {
                key: 'total_price',
                title: '总价',
                dataIndex: 'total_price',
            },
            {
                key: 'order_quantity',
                title: '数量',
                dataIndex: 'order_quantity',
                render: (_, item: StateCartType) => {
                    const {order_quantity, quantity} = item
                    return (
                        <InputNumber
                            min={0}
                            max={quantity}
                            value={order_quantity}
                            onChange={(val: number) => this.onChangeQuantity(val, item)} />
                    )
                }
            },
            {
                key: 'operator',
                title: '操作',
                render: (_, item: StateCartType) => {
                    return[
                        <Button
                            type="danger"
                            onClick={() => this.handleDelete(item)}
                        >
                            删除
                        </Button>
                    ]
                }

            }
        ];
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const priceInfo = selectedRowKeys.reduce((prev : {origin_price: number, actual_price: number, order_quantity: number}, rowKey: number) => {
            const curData = cartData.find((cart: StateCartType) => cart.id.toString() === rowKey.toString());
            if(!curData) return prev;
            return {
                origin_price: prev.origin_price + curData.order_quantity * curData.origin_price,
                actual_price: prev.actual_price + curData.order_quantity * curData.actual_price,
                order_quantity: prev.order_quantity + curData.order_quantity,
            }
        }, {
            origin_price: 0,
            actual_price: 0,
            order_quantity: 0,
        })
        return (
            <div>
                <Table
                    rowSelection={rowSelection}
                    title={() => (<h3>购物车</h3>)}
                    rowKey={(item: StateCartType) => item.id}
                    columns={columns}
                    dataSource={cartData}
                />
                <div className="Cart-AddressSelect">
                    <h3 style={{marginRight: 20}}>收货地址:</h3>
                    <Select
                        style={{width: 400}}
                        value={(selectedAddress || '').toString()}
                        onChange={(val) => this.setState({selectedAddress: val})}
                    >
                        {
                            (addresses || []).map((addressInfo: StateAddressType) => {
                                const {id, name, address, phone} = addressInfo
                                return (
                                    <Option value={id.toString()}>{name}, {address}, {phone}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <Card
                    className="Cart-AddressOrderWrapper"
                >
                    <div className="Cart-AddressOrderContent">
                        <div>原价：{priceInfo.origin_price}, 会员价： {priceInfo.actual_price}</div>
                        <Button
                            type="primary"
                            disabled={ Number(selectedAddress) < 0 || priceInfo.order_quantity ===0 }
                            onClick={this.handleCreateOrder}
                        >
                            确认下单
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateProps = (state: RootState) => {
    return {
      cartData: state.cart.cart,
      addresses: state.profile.address,
      currentUser: state.profile.currentUser
    };
};

export default connect(mapStateProps)(Cart);