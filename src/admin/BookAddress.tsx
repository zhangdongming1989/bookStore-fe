import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Input, Button, DatePicker, InputNumber } from 'antd';
import * as Form from 'antd/es/form';
import * as Table from 'antd/es/table';
import * as Moment from 'moment';
import { requestIsbnBookList } from '../redux/admin/actions';
import { RootState } from '../redux/types';
import { StateBookAddress } from '../redux/admin/types';
import ExportFile, { filenameCreator } from '../components/ExportFile/index';
import {
    // requestConfirmSent,
    requestChangeDeliveriedQuantity,
} from '../redux/admin/actions';

interface BookAddressProps extends Form.FormComponentProps {
    dispatch: Dispatch<() => {}>;
    bookAddressList: StateBookAddress[];
}

interface FormParamProps {
    time: [Moment.Moment, Moment.Moment];
    isbn: string;
}

interface TableDataProps {
    order_id: string;
    order_quantity: number;
    supplier_name: string;
    actual_price: number;
    address: string;
    consignee: string;
    post_code: string;
    phone: string;
    deliveried_quantity: number;
    user_id: number;
    supplier_id: string;
}

class BookAddress extends React.Component<BookAddressProps> {
    handleSubmit = (evt?: React.FormEvent<HTMLFormElement>) => {
        const {dispatch, form} = this.props;
        if (evt) {
            evt.preventDefault();
        }
        const {time, isbn} = form.getFieldsValue() as FormParamProps;
        dispatch(requestIsbnBookList(isbn, time));
    }

    renderSearch = () => {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <div
                style={{display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: 20}}
            >
                <Form.default
                    onSubmit={this.handleSubmit}
                    style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                >
                    <Form.default.Item style={{width: 400, display: 'flex'}} label="选择时间段">
                        {
                            getFieldDecorator('time', {
                                initialValue: [Moment(), Moment()]
                            })(
                                <DatePicker.RangePicker
                                    allowClear={false}
                                />
                            )
                        }
                    </Form.default.Item>
                    <Form.default.Item style={{width: 400, display: 'flex'}} label="书籍 isbn">
                        {
                            getFieldDecorator('isbn')(
                                <Input

                                    placeholder="请输入要查询书籍的 isbn 号"
                                    style={{width: 200}}
                                />
                            )
                        }
                    </Form.default.Item>
                    <Button htmlType="submit">查询</Button>
                </Form.default>
            </div>
        );
    }

    // confirmSent = (record: TableDataProps) => {
    //     const {dispatch, form} = this.props;
    //     const {time, isbn} = form.getFieldsValue() as FormParamProps;
    //     dispatch(requestIsbnBookList(isbn, time));
    //     dispatch(requestConfirmSent(record.order_id, {time, isbn}));
    // }
    onChangeQuantity = (val: number, record: TableDataProps) => {
        //tslint:disable
        const {dispatch, form} = this.props;
        const {time, isbn} = form.getFieldsValue() as FormParamProps;
        const {order_id, supplier_id} = record;
        dispatch(requestChangeDeliveriedQuantity(supplier_id.toString(), order_id, val, {time, isbn}));
    }

    renderTable = () => {
        const bookAddressList = this.props.bookAddressList as TableDataProps[];
        const {time, isbn} = this.props.form.getFieldsValue() as FormParamProps;
        const columns: Table.ColumnProps<TableDataProps>[] = [
            {
                key: 'order_id',
                title: '订单号',
                dataIndex: 'order_id',
            },
            {
                key: 'isbn',
                title: 'ISBN',
                dataIndex: 'isbn',
            },
            {
                key: 'order_quantity',
                title: '数量',
                dataIndex: 'order_quantity',
            },
            {
                key: 'supplier_name',
                title: '供货商',
                dataIndex: 'supplier_name',
            },
            {
                key: 'actual_price',
                title: '实洋',
                dataIndex: 'actual_price',
                width: 100,
            },
            {
                key: 'address',
                title: '地址',
                dataIndex: 'address',
                width: 180
            },
            {
                key: 'consignee',
                title: '收货人',
                dataIndex: 'consignee',
                width: 100,
            },
            {
                key: 'post_code',
                title: '邮编',
                dataIndex: 'post_code',
                width: 100,
            },
            {
                key: 'phone',
                title: '电话',
                dataIndex: 'phone',
            },
            {
                key: 'operator',
                title: '操作',
                render: ((_, record: TableDataProps) => {
                    const {order_quantity, deliveried_quantity} = record;
                    return (
                        <div>
                            <InputNumber
                                min={deliveried_quantity}
                                max={order_quantity}
                                value={deliveried_quantity}
                                onChange={(val: number) => this.onChangeQuantity(val, record)}
                            />
                            <Button onClick={() => this.onChangeQuantity(order_quantity, record)}>分拣全部</Button>
                        </div>
                    );
                })
            }

        ];
        return (
            <div style={{marginTop: 20}}>
                <Table.default
                    columns={columns}
                    dataSource={bookAddressList}
                />
                <div style={{height: 20}} />
                <ExportFile
                    data={bookAddressList}
                    columns={columns}
                    filename={filenameCreator('book_address', isbn, '', time)}
                    disabled={!bookAddressList.length}
                />
            </div>
        );
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                {this.renderSearch()}
                {this.renderTable()}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        bookAddressList: state.admin.bookAddressList
    };
};

export default connect(mapStateToProps)(Form.default.create()(BookAddress));
