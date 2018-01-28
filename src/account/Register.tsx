import * as React from 'react';
import { Input, Form, Radio, Button } from 'antd';
import { formOptions } from '../config/formConstants';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/es/form/FormItem';
import RadioGroup from 'antd/es/radio/group';

const {create} = Form;

interface Props {
    form: Object;
}

interface RegisterFormComponentProps extends FormComponentProps {
    username: string;
    real_name: string;
    sex: 'male' | 'female';
    email: string;
    password: string;
    confirm_password: string;
    password_question: string;
    password_answer: string;
    tel_number: string | number;
    office_tel: string | number;
    qq: string | number;
}

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class Register extends React.Component<Props & RegisterFormComponentProps> {
    handleValidateConfirmPassword = (rule: object, value: string | number, callback: (message?: string) => {}) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('您输入的两次密码不相同');
        } else {
            callback();
        }
    }

    handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
        if (evt) {
            evt.preventDefault();
        }
        const {validateFields} = this.props.form;
        // tslint:disable no-console no-debugger
        validateFields(
            (errors) => {
            console.log(errors);
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
                    label="真实姓名"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('real_name', {
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
                        getFieldDecorator('sex', {
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
                        getFieldDecorator('email', {
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
                        getFieldDecorator('password_question', {
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
                        getFieldDecorator('password_answer', {
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
                        getFieldDecorator('tel_number', {
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
                    label="办公电话"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('office_tel')(
                            <Input type="tel" />
                        )
                    }
                </FormItem>
                <FormItem
                    label="QQ号"
                    {...formItemLayout}
                >
                    {
                        getFieldDecorator('qq')(
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