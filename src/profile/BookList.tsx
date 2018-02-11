import * as React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';

interface DataMeta {
    id: string;
    count: string;
    mark_price: string;
    real_price: string;
    time: string;
    book_status: string;
    post_status: string;
    pay_status: string;
}

const columns: ColumnProps <DataMeta>[] = [
    {
        key: 'id',
        title: '订单编号',
        dataIndex: 'id',
    },
    {
        key: 'count',
        title: '数量',
        dataIndex: 'count',
    },
    {
        key: 'mark_price',
        title: '码洋',
        dataIndex: 'mark_price',
    },
    {
        key: 'real_price',
        title: '实洋',
        dataIndex: 'real_price',
    },
    {
        key: 'time',
        title: '订单时间',
        dataIndex: 'time',
    },
    {
        key: 'book_status',
        title: '订单状态',
        dataIndex: 'book_status',
    },
    {
        key: 'post_status',
        title: '发货状态',
        dataIndex: 'post_status',
    },
    {
        key: 'key: pay_status',
        title: '付款状态',
        dataIndex: 'pay_status',
    },
];

export const bookList: DataMeta[] = [
    {
        id: '18020241206',
        count: '16',
        mark_price: '679',
        real_price: '400',
        time: '2018-02-02 10:34:50',
        book_status: '已下单',
        post_status: '配送中',
        pay_status: '已付款',
    }
];

export default class BookList extends React.Component {
    render() {
        return (
            <div>
                <Table
                    dataSource={bookList}
                    columns={columns}
                />
            </div>
        );
    }
}