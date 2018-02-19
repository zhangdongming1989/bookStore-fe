import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { List, Card, Table } from 'antd';
import { requestAccountInfo } from '../redux/profile/actions';
import { RootState } from '../redux/types';
import { ColumnProps } from 'antd/lib/table';

const mapAccountInfoKeyToText = {
    balance: '余额',
    bonus_point: '折扣额',
    discount: '折扣',
};

// tslint:disable
interface AccountInfoProps {
    accountInfo: StateAccountInfoType | null;
    accountInfoLog: StateAccountInfoLogType[] | null;
    dispatch: Dispatch<() => {}>;
}

class AccountInfo extends React.Component<AccountInfoProps, {}> {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(requestAccountInfo());
    }
    render() {
        const { accountInfo, accountInfoLog } = this.props;
        if( !accountInfo || !accountInfoLog ) return null;
        const columns:ColumnProps<StateAccountInfoLogType>[] = [{
            title: '时间',
            dataIndex: 'created_at'
        },{
            title: '操作类型',
            dataIndex: 'type'
        }, {
            title: '金额',
            dataIndex: 'amount'
        }, {
            title: '结余',
            dataIndex: 'current_balance'
        }];
        const accountInfoList = Object
            .keys(accountInfo)
            .filter(key => key !== 'user_id')
            .map((key) => ({key, value: accountInfo[key]}))
        const accountInfoLogList = accountInfoLog
            .map((val: StateAccountInfoLogType, index) => ({...val, index}))
        return (
            <div className="ProfileAccountInfo-Layout">
                <List
                    className="ProfileCurrentUser-Wrapper"
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={accountInfoList}
                    renderItem={(item: ItemProps) => {
                        const {key, value = '无'} = item
                        return (
                            <List.Item
                                className="ProfileCurrentUser-Item"
                            >
                                <Card title={mapAccountInfoKeyToText[key]}>{`${value}`}</Card>
                            </List.Item>
                        )
                    }
                    }
                />
                <Table
                    title={() => (<h3>近期消费记录</h3>)}
                    columns={columns}
                    dataSource={accountInfoLogList}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        accountInfo: state.profile.accountInfo,
        accountInfoLog: state.profile.accountInfoLog,
    };
};

export default connect(mapStateToProps)(AccountInfo);