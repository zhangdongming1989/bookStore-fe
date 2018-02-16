import * as React from 'react';
import { InjectedRouter } from 'react-router';
import { Dispatch } from 'redux';
import { Input, Form, Radio, Button, message } from 'antd';
import { omit } from 'lodash';
import { formOptions } from '../config/formConstants';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/es/form/FormItem';
import RadioGroup from 'antd/es/radio/group';
import {
    requestRegister,
    Status,
    clearRegisterStatus,
} from '../redux/account/actions';
import { MESSAGE_DURATION } from '../constants';

const {create} = Form;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

interface ExtraProps {
    dispatch: Dispatch<Object>;
    status: StateRegisterStatusType;
    router: InjectedRouter;
}

class Register extends React.Component<RegisterInputType & FormComponentProps & ExtraProps> {
    handleValidateConfirmPassword = (rule: object, value: string | number, callback: (message?: string) => {}) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('您输入的两次密码不相同');
        } else {
            callback();
        }
    }

    componentWillReceiveProps(nextProps: RegisterInputType & FormComponentProps & ExtraProps) {
        const {status: nextStatus} = nextProps;
        const {status, router, dispatch} = this.props;
        if ( nextStatus && nextStatus.status === Status.ok && status === null) {
            // 注册成功
            window.setTimeout(
                () => {
                    router.replace('/account/login');
                    },
                MESSAGE_DURATION
            );
            message.error('注册成功，三秒后会跳转去登录', MESSAGE_DURATION / 1000);
            dispatch(clearRegisterStatus());
        } else if ( nextStatus && nextStatus.status === Status.fail && status === null) {
            const { message: messageContent } = nextStatus as StateLoginStatusFailType;
            message.error(messageContent, MESSAGE_DURATION / 1000);
        }
    }

    handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
        if (evt) {
            evt.preventDefault();
        }
        const { form, dispatch } = this.props;
        const {validateFields, getFieldsValue} = form;
        const registerValues = omit(getFieldsValue(), 'confirm_password') as RegisterInputType;
        // tslint:disable no-console no-debugger
        validateFields(
            (errors) => {
                if (errors && Object.keys(errors).length > 0) {
                    return;
                }
                dispatch(requestRegister(registerValues));
        });
    }

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Form
              onSubmit={this.handleSubmit}
            >
                <FormItem
                    label="用户名"
                    {...formItemLayout}
                >
                  {
                     getFieldDecorator('username', {
                         rules: [
                             formOptions.required,
                             {
                                 pattern: /^[\s\S]{6,16}$/,
                                 message: '长度应为6-16位'
                             },
                         ]
                     })(
                         <Input
                            placeholder="请输入6-16位用户名"
                         />)
                  }
                </FormItem>
                <FormItem
                    label="昵称"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('nickname', {
                            rules: [
                                formOptions.required,
                                {
                                    pattern: /^[\s\S]{6,16}$/,
                                    message: '长度应为6-16位'
                                },
                            ]
                        })(
                            <Input
                                placeholder="请输入6-16位昵称"
                            />)
                    }
                </FormItem>
                <FormItem
                    label="真实姓名"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('realname', {
                            rules: [
                                formOptions.required,
                            ]
                        })(
                            <Input />)
                    }
                </FormItem>
                <FormItem
                    label="性别"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('gender', {
                            initialValue: 'female',
                            rules: [
                                formOptions.required,
                            ]
                        })(<RadioGroup>
                            <Radio value="male">男</Radio>
                            <Radio value="female">女</Radio>
                        </RadioGroup>)
                    }
                </FormItem>
                <FormItem
                    label="电子邮箱"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('mail', {
                            rules: [
                                formOptions.required,
                                {
                                    type: 'email',
                                    message: '邮箱格式不合法',
                                }
                            ]
                        })(
                            <Input
                                type="email"
                                placeholder="请输入您的密码"
                            />
                        )
                    }
                </FormItem>
                <FormItem
                    label="密码"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('password', {
                            rules: [
                                formOptions.required,
                            ]
                        })(
                            <Input
                                type="password"
                                placeholder="请输入密码"
                            />)
                    }
                </FormItem>
                <FormItem
                    label="确认密码"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('confirm_password', {
                            rules: [
                                formOptions.required,
                                {
                                    validator: this.handleValidateConfirmPassword,
                                }
                            ]
                        })(
                            <Input
                                type="password"
                                placeholder="请再次输入密码"
                            />)
                    }
                </FormItem>
                <FormItem
                    label="密码问题"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('pwdquestion', {
                            rules: [
                                formOptions.required,
                            ]
                        })(
                            <Input />)
                    }
                </FormItem>
                <FormItem
                    label="密码答案"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('pwdanswer', {
                            rules: [
                                formOptions.required,
                            ]
                        })(
                            <Input />)
                    }
                </FormItem>
                <FormItem
                    label="手机号"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('phone', {
                            rules: [
                                formOptions.required,
                                {
                                    pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
                                    message: '您输入的手机号不合法',
                                }
                            ]
                        })(
                            <Input type="tel" />)
                    }
                </FormItem>
                <FormItem
                    label="QQ号"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('qq', {
                            rules: [
                                formOptions.required,
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem>
                <span className="account-LoginRegister">
                    已经有帐号了？去<a href="/account/login">登录</a> </span>

                </FormItem>
                <Button type="primary" htmlType="submit" className="account-SubmitButton">
                    注册
                </Button>
            </Form>
        );
    }
}

export default create()(Register);