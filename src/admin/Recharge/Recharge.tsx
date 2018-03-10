import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../../redux/types';
import { Input, Button, InputNumber } from 'antd';
import { requestGetAccount, requestCharge } from '../../redux/admin/actions';

interface Props {
    dispatch: Dispatch<() => {}>;
    accountInfoList: {
        [nameProps: string]: StateAccountInfoType;
    };
}

interface RechargeState {
    searchValue: string;
    tempValue: string;
    moneyValue: number;
}

//tslint:disable
class Recharge extends React.Component<Props, RechargeState> {
    state = {
        searchValue: '',
        tempValue: '',
        moneyValue: 0,
    };

    handleSearch = () => {
        const {dispatch} = this.props
        const {tempValue} = this.state
        if(tempValue) {
            dispatch(requestGetAccount(tempValue))
            this.setState({searchValue: tempValue})
        }
    }

    handleRecharge = () => {
        const {accountInfoList, dispatch} = this.props
        const {searchValue, moneyValue} = this.state
        const accountInfo = accountInfoList[searchValue]
        this.setState({moneyValue: 0})
        dispatch(requestCharge(accountInfo.user_id, moneyValue, searchValue))
    }

    renderSearch = () => {
        const {tempValue} = this.state;
        return (
            <div
                style={{display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: 20}}
            >
                <Input
                    value={tempValue}
                    placeholder="请输入要充值的用户名"
                    style={{width: 200}}
                    onChange={(e) => {
                        this.setState({tempValue: e.target.value})
                    }}
                />
                <Button onClick={this.handleSearch}>查询</Button>
            </div>
        );
    }

    renderRecharge = () => {
        const {accountInfoList} = this.props
        const {searchValue, moneyValue} = this.state
        const data = accountInfoList[searchValue]
        return (
            <div style={{display: 'flex', justifyContent: 'space-around', marginTop: 20}}>
                <div key="user_name">用户：{searchValue}</div>
                <div key="balance">余额：{data.balance}</div>
                <div>
                    <InputNumber
                        value={moneyValue}
                        onChange={value => {this.setState({moneyValue: Number(value || 0.01)})}}
                    />
                </div>
                <Button onClick={this.handleRecharge}>充值</Button>
            </div>
        )
    }

    render() {
        const {accountInfoList} = this.props
        const {searchValue} = this.state
        return (
            <div
                style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%'}}
            >
                {this.renderSearch()}
                {accountInfoList && accountInfoList[searchValue] && this.renderRecharge()}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        accountInfoList: state.admin.accountInfoList,
    };
};

export default connect(mapStateToProps)(Recharge);