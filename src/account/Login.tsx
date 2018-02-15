/// <reference path="../redux/account/types.d.ts" />
import * as React from 'react';
import { Dispatch } from 'redux';
import { InjectedRouter } from 'react-router';
import { Form, Input, Button, Icon, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { formOptions } from '../config/formConstants';
import { requestLogin, clearLoginStatus } from '../redux/account/actions';
import { Status } from '../redux/account/actions';
import { MESSAGE_DURATION } from '../constants';

const {create, Item: FormItemWrapper } = Form;

//tslint:disable

interface LoginComponentProps extends FormComponentProps {
    username: string;
    password: string;
    dispatch: Dispatch<Object>;
    status: StateLoginStatusType;
    router: InjectedRouter;
}

class Login extends React.Component<LoginComponentProps> {

    componentWillReceiveProps(nextProps: LoginComponentProps) {
        const {status: nextStatus} = nextProps;
        const {status, router, dispatch} = this.props;
        if(nextStatus && nextStatus.status === Status.ok && status === null) {
            // 登录成功
            router.replace('/');
            dispatch(clearLoginStatus())
        } else if(nextStatus && nextStatus.status === Status.fail && status === null) {
            // 登录成功
            const { message: messageContent } = nextStatus as StateLoginStatusFailType
            message.error(messageContent, MESSAGE_DURATION / 1000)
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(clearLoginStatus())
    }

    handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
        if (evt) { evt.preventDefault(); }
        const {dispatch, form} = this.props;
        const {validateFields, getFieldsValue} = form;
        // tslint:disable no-console no-debugger
        validateFields((errors) => {
            if (errors && Object.keys(errors).length) {
                return;
            }
            const loginInput = getFieldsValue(['username', 'password']) as LoginInputType;
            dispatch(requestLogin(loginInput));
        });
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItemWrapper>
                    {getFieldDecorator('username', {
                        rules: [
                            formOptions.required,
                        ]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入用户名"

                        />
                    )}
                </FormItemWrapper>
                <FormItemWrapper>
                    {getFieldDecorator('password', {
                        rules: [
                            formOptions.required,
                        ]
                    })(
                        <Input
                            placeholder="请输入密码"
                            type="password"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    )
                    }
                </FormItemWrapper>
                <FormItemWrapper>
                <span className="account-LoginRegister">
                    没有帐号？去<a href="/account/register">注册</a> </span>

                </FormItemWrapper>
                <Button type="primary" htmlType="submit" className="account-LoginButton">
                    登录
                </Button>
            </Form>
        );
    }
}

export default create()(Login);
