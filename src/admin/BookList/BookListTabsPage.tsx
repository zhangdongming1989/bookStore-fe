import * as React from 'react';
import { Tabs, DatePicker, Input, Button } from 'antd';
import * as Form from 'antd/es/form';
import * as Moment from 'moment';
import { connect, Dispatch } from 'react-redux';
import { requestBookList } from '../../redux/admin/actions';
import BookList from './BookList';
import { RootState } from '../../redux/types';
import { DATE_FORMAT } from '../../constants';

const TabPane = Tabs.TabPane;

interface BookListTabsPageProps extends Form.FormComponentProps {
    dispatch: Dispatch<() => {}>;
    bookList: {
        selling: BookListType;
        sold: BookListType;
    };
}

class BookListTabsPage extends React.Component<BookListTabsPageProps> {
    handleSubmit = (evt: React.FormEvent<HTMLFormElement> | null, ChangeStatus: ActionOrderStatus = 'selling') => {
        if (evt) {
            evt.preventDefault();
        }
        const {dispatch, form} = this.props;
        const { time, nickname, status } = form.getFieldsValue() as
            {time: [Moment.Moment, Moment.Moment], nickname: string, status: ActionOrderStatus};
        dispatch(requestBookList({
            fromDate: time[0].format(DATE_FORMAT),
            toDate: time[1].format(DATE_FORMAT),
            ...(nickname && {nickname}),
            status: ChangeStatus || status,
        }));
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
                    <Form.default.Item style={{width: 400, display: 'flex'}} label="用户昵称">
                        {
                            getFieldDecorator('nickname')(
                                <Input

                                    placeholder="请输入用户昵称"
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

    render() {
        const {bookList, form} = this.props;
        const {selling: sellingList, sold: soldList} = bookList;
        const time = form.getFieldValue('time') as [Moment.Moment, Moment.Moment];

        return (
            <div>
                {this.renderSearch()}
                {
                    form.getFieldDecorator('status', {
                        initialValue: 'selling'
                    })(
                        <Tabs
                            onChange={(key: ActionOrderStatus) => this.handleSubmit(null, key)}
                        >
                            <TabPane tab="处理中" key="selling">
                                <BookList bookList={sellingList} isFinished={false} time={time} />
                            </TabPane>
                            <TabPane tab="已完成" key="sold">
                                <BookList bookList={soldList} isFinished={true} time={time} />
                            </TabPane>
                            {/*<TabPane tab=""><BookList bookList={[]} /></TabPane>*/}
                        </Tabs>
                    )
                }
            </div>
        );
    }
}
const mapStateToProps = (state: RootState) => {
    return {
        bookList: {
            selling: state.admin.bookList.selling,
            sold: state.admin.bookList.sold
        }
    };
};
export default connect(mapStateToProps)(Form.default.create()(BookListTabsPage));