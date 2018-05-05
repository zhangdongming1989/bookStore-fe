import * as React from 'react';
import * as Form from 'antd/es/form';
import { Input, notification } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { formOptions } from '../config/formConstants';
import { requestResetPassword } from '../redux/admin/actions';

interface ResetPasswordProps extends Form.FormComponentProps {
    dispatch: Dispatch<() => {}>;
}

class ResetPassword extends React.Component<ResetPasswordProps> {
    handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        if (evt) {
            evt.preventDefault();
        }
        const {form, dispatch} = this.props;
        const { username, password, reset_password } =
            form.getFieldsValue() as {username: string; password: string; reset_password: string};
        form.validateFields(err => {
            if (!err) {
                if (password !== reset_password) {
                    return notification.error({message: '两次输入密码不同', description: '请检查后重试'});
                } else {
                    dispatch(requestResetPassword({username, password}));
                }
            }
        });
    }

    render() {
        const {form} = this.props;
        const { getFieldDecorator } = form;
        const {Item: FormItem} = Form.default;
        return (
            <Form.default
                onSubmit={this.handleSubmit}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <FormItem
                    label="用户名"
                    style={{display: 'flex', marginTop: 10, marginLeft: -100}}
                >
                    {
                        getFieldDecorator('username', {
                            rules: [
                                formOptions.required,
                            ]
                        })(
                            <Input />)
                    }
                </FormItem>
                <FormItem
                    label="新密码"
                    style={{display: 'flex', marginTop: 10, marginLeft: -100}}
                >
                    {
                        getFieldDecorator('password', {
                            rules: [
                                formOptions.required,
                            ]
                        })(
                            <Input type="password" />)
                    }
                </FormItem>
                <FormItem
                    label="重复新密码"
                    style={{display: 'flex', marginTop: 10, marginLeft: -100}}
                >
                    {
                        getFieldDecorator('reset_password', {
                            rules: [
                                formOptions.required,
                            ]
                        })(
                            <Input type="password" />)
                    }
                </FormItem>
                <Input type="submit" style={{width: 100}} />
            </Form.default>
        );
    }
}

export default connect()(Form.default.create()(ResetPassword));