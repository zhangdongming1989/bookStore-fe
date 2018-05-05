import * as React from 'react';
import * as Form from 'antd/es/form';
import { Input } from 'antd';
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
        const { username, password } =
            form.getFieldsValue() as {username: string; password: string; };
        form.validateFields(err => {
            if (!err) {
                dispatch(requestResetPassword({username, password}));
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
                        getFieldDecorator('password', {
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