import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Modal, Table } from 'antd';
import { RootState } from '../redux/types';
import { ColumnProps } from 'antd/lib/table';

//tslint:disable
interface BookListDetailModalProps {
    visible: boolean;
    onClose: () => void;
    record: BookItemType | null;
    dispatch: Dispatch<() => {}>;
    details: BookListDetailType;
}

const columns:ColumnProps <StateBookItemDetail>[] = [
    {
        key: 'warehouse',
        title: '库区',
        dataIndex: 'warehouse',
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
        key: 'order_quantity',
        title: '购买数',
        dataIndex: 'order_quantity'
    },
    {
        key: 'actual_price',
        title: '实际价格',
        dataIndex: 'actual_price',
    },
    {
        key: 'deliveried_quantity',
        title: '已分拣数量',
        dataIndex: 'deliveried_quantity'
    },
];

class BookListDetailModal extends React.Component<BookListDetailModalProps, {}> {
    render() {
        const {visible, onClose, details = {}} = this.props;
        const record = this.props.record as BookItemType || {}
        if(!record) return null;
        const detailList = details[record.order_id] || []
        const {order_id} = record as BookItemType;
        return (
            <Modal
                visible={visible}
                footer={null}
                onCancel={onClose}
                title={`订单 ${order_id} 的书目`}
                width={800}
            >
                <Table
                    dataSource={detailList}
                    columns={columns}
                />
            </Modal>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        details: state.profile.bookListDetail,
    }
}

export default connect(mapStateToProps)(BookListDetailModal)