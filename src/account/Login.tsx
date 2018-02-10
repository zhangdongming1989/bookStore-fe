import * as React from 'react';
import { Dispatch } from 'redux';
import { Form, Input, Button, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { formOptions } from '../config/formConstants';
import { accountActions } from '../redux/account';

const {create, Item: FormItemWrapper } = Form;

interface LoginComponentProps extends FormComponentProps {
    username: string;
    password: string;
    dispatch: Dispatch<Object>;
}

interface Props {
}

class Login extends React.Component<Props & LoginComponentProps> {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(accountActions.account(1));
    }
    handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
        if (evt) { evt.preventDefault(); }
        const {validateFields} = this.props.form;
        // tslint:disable no-console no-debugger
        validateFields((errors) => {
            console.log(errors);
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
