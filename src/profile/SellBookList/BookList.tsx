import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
import BookListDetailModal from '../BookListDetailModal';
import { requestBookListDetail, requestConfirmSent } from '../../redux/profile/actions';

// tslint:disable

interface BookListProps {
    bookList: BookListType;
    dispatch: Dispatch<() => {}>;
    isFinished: boolean;
}

class BookList extends React.Component<BookListProps, {}> {

    state= {
        detailModalVisible: false,
        selectedRecord: null,
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

    confirmSent = (record: BookItemType) => {
        const {dispatch} = this.props
        dispatch(requestConfirmSent(record.order_id))
    }

    render() {
        const { bookList = [] } = this.props;
        const {selectedRecord, detailModalVisible} = this.state
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
                    const typeMap = {0: '未发货', 1: '已发货'}
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
                                onClick={() => {this.handleClick(record)}}
                                size="small"
                                key="show_list"
                            >
                                订单书目
                            </Button>
                            {
                                !record.delivery_status &&
                                <Button
                                    onClick={() => {this.confirmSent(record)}}
                                    size="small"
                                    key="confirm"
                                >
                                    确认已发货
                                </Button>
                            }
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
            </div>
        );
    }
}

export default connect()(BookList);