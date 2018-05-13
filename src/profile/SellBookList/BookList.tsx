import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Table, Button, Modal } from 'antd';
import { ColumnProps } from 'antd/lib/table';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
import BookListDetailModal from '../BookListDetailModal';
import { requestBookListDetail, requestAddressByOrder } from '../../redux/profile/actions';
import { RootState } from '../../redux/types';

// tslint:disable

interface BookListProps {
    bookList: BookListType;
    dispatch: Dispatch<() => {}>;
    isFinished: boolean;
    orderAddressMap: {
        [propsName: string]: StateOrderAddressType;
    };
}

class BookList extends React.Component<BookListProps, {}> {

    state= {
        detailModalVisible: false,
        selectedRecord: null,
        showAddressOrderId: '',
        showAddressModal: false,
    }

    handleToggleModal = () => {
        this.setState({detailModalVisible: !this.state.detailModalVisible})
    }

    handleClick = (record: BookItemType) => {
        const {dispatch} = this.props;
        this.setState({selectedRecord: record})
        dispatch(requestBookListDetail(record.order_id))
        this.handleToggleModal()
    }

    handleShowAddress = (record: BookItemType) => {
        const {dispatch} = this.props
        dispatch(requestAddressByOrder(record.order_id))
        this.setState({showAddressOrderId: record.order_id})
        this.handleToggleAddressModal()
    }

    handleToggleAddressModal = () => {
        this.setState({showAddressModal: !this.state.showAddressModal})
    }
    render() {
        const { bookList = [], orderAddressMap} = this.props;
        const {selectedRecord, detailModalVisible, showAddressModal, showAddressOrderId} = this.state
        const addressInfo = orderAddressMap[showAddressOrderId] || {}
        const columns: ColumnProps<BookItemType>[] = [
            {
                key: 'order_id',
                title: '订单编号',
                dataIndex: 'order_id',
            },
            {
                key: 'origin_cost',
                title: '码洋',
                dataIndex: 'origin_cost',
            },
            {
                key: 'actual_cost',
                title: '实洋',
                dataIndex: 'actual_cost',
            },
            {
                key: 'time',
                title: '订单时间',
                dataIndex: 'time',
            },
            {
                key: 'order_status',
                title: '订单状态',
                dataIndex: 'order_status',
                render: (_, item: BookItemType) => {
                    const typeMap = {0: '已下单', 1: '正常',2: '退单'}
                    return typeMap[item.order_status] || '未知';
                }
            },
            {
                key: 'delivery_status',
                title: '发货状态',
                dataIndex: 'delivery_status',
                render: (_, item: BookItemType) => {
                    const typeMap = { 0: '未发货', 1: '已发货', 2: '已收货'}
                    return typeMap[item.delivery_status] || '未知';
                }
            },
            {
                key: 'pay_status',
                title: '付款状态',
                dataIndex: 'pay_status',
                render: (_, item: BookItemType) => {
                    const typeMap = {0: '未付款', 1: '已付款'}
                    return typeMap[item.pay_status] || '未知';
                }
            },
            {
                key: 'operator',
                title: '操作',
                render: ((_, record) => {
                    return (
                        <div style={{display: 'flex'}}>
                            <Button
                                onClick={() => {this.handleShowAddress(record)}}
                                size="small"
                                key="address_info"
                            >
                                查看收货人信息
                            </Button>
                            <Button
                                onClick={() => {this.handleClick(record)}}
                                size="small"
                                key="show_list"
                            >
                                订单书目
                            </Button>
                        </div>
                    )
                })
            }
        ];
        return (
            <div>
                <Table
                    rowKey={(bookItem: BookItemType) => bookItem.order_id }
                    dataSource={bookList}
                    columns={columns}
                />
                <BookListDetailModal
                    visible={detailModalVisible}
                    onClose={this.handleToggleModal}
                    record={selectedRecord}
                />
                <Modal
                    visible={showAddressModal}
                    title={`订单${addressInfo.order_id}`}
                    onCancel={this.handleToggleAddressModal}
                    onOk={this.handleToggleAddressModal}
                >
                    <div>
                        {
                            addressInfo.consignee ?
                                <div>
                                    <div>收货人：{addressInfo.consignee}</div>
                                    <div>地址：{addressInfo.address}</div>
                                    <div>电话：{addressInfo.phone}</div>
                                    <div>邮编: {addressInfo.post_code}</div>
                                </div> :
                                <div>正在查询。。。</div>
                        }
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state:RootState) => {
    return {
        orderAddressMap: state.profile.orderAddressMap
    }
}

export default connect(mapStateToProps)(BookList);