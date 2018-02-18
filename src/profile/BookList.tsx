import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { RootState } from '../redux/types';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
import { requestBookList } from '../redux/profile/actions';
import BookListDetailModal from './BookListDetailModal';
import { requestBookListDetail } from '../redux/profile/actions';

// tslint:disable

interface BookListProps {
    bookList: BookListType;
    dispatch: Dispatch<() => {}>;
}

const mapStateToProps = (state: RootState) => {
    return {
      bookList: state.profile.bookList,
    };
};

class BookList extends React.Component<BookListProps, {}> {

    state= {
        detailModalVisible: false,
        selectedRecord: null,
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(requestBookList())
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

    render() {
        const { bookList = [] } = this.props;
        const {selectedRecord, detailModalVisible} = this.state
        const columns:ColumnProps <BookItemType>[] = [
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
            },
            {
                key: 'delivery_status',
                title: '发货状态',
                dataIndex: 'delivery_status',
            },
            {
                key: 'pay_status',
                title: '付款状态',
                dataIndex: 'pay_status',
            },
            {
                key: 'operator',
                title: '操作',
                render: ((_, record) => {
                    return (
                        <Button
                            onClick={() => {this.handleClick(record)}}
                            size="small"
                        >
                            订单书目
                        </Button>
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

export default connect(mapStateToProps)(BookList);