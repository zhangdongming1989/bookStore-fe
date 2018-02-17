import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Form, { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { requestAccountInfo } from '../redux/profile/actions';
import { RootState } from '../redux/types';


// tslint:disable
interface AccountInfoProps {
    accountInfo: StateAccountInfoType | null;
    dispatch: Dispatch<() => {}>;
}

class AccountInfo extends React.Component<AccountInfoProps & FormComponentProps, {}> {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(requestAccountInfo());
    }
    render() {
        const { accountInfo } = this.props;
        if( !accountInfo ) return null;
        const {user_id, balance, bonus_point, discount} = accountInfo;
        return (
            <div className="ProfileAccountInfo-Layout">
                <Form className="ProfileAccountInfo-Form">
                    <FormItem
                        label="用户 id："
                        labelCol={{span: 6}}
                        wrapperCol={{span: 6}}
                    >
                        <p className="ant-form-text" id="user_id">{user_id}</p>
                    </FormItem>
                    <FormItem
                        label="balance"
                        labelCol={{span: 6}}
                        wrapperCol={{span: 6}}
                    >
                        <p className="ant-form-text" id="balance">{balance || '无'}</p>
                    </FormItem>
                    <FormItem
                        label="bonus_point"
                        labelCol={{span: 6}}
                        wrapperCol={{span: 6}}
                    >
                        <p className="ant-form-text" id="bonus_point">{bonus_point || '无'}</p>
                    </FormItem>
                    <FormItem
                        label="discount"
                        labelCol={{span: 6}}
                        wrapperCol={{span: 6}}
                    >
                        <p className="ant-form-text" id="userName">{discount || '无'}</p>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        accountInfo: state.profile.accountInfo,
    };
};

export default connect(mapStateToProps)(AccountInfo);