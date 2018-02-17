import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { RootState } from '../redux/types';
// import { WrappedFormUtils } from 'antd/lib/form/Form';
import { requestBookList } from '../redux/profile/actions';

// tslint:disable
const columns: ColumnProps <BookItemType>[] = [
    {
        key: 'order_id',
        title: '订单编号',
        dataIndex: 'order_id',
    },
    {
        key: 'count',
        title: '数量',
        dataIndex: 'count',
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
];

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

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(requestBookList())
    }

    render() {
        const { bookList = [] } = this.props;
        return (
            <div>
                <Table
                    rowKey={(bookItem: BookItemType) => bookItem.order_id }
                    dataSource={bookList}
                    columns={columns}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(BookList);
// export default connect(mapStateToProps)(BookList);