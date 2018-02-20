import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Modal, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { formOptions } from '../config/formConstants';
import { requestAddAddress } from '../redux/profile/actions';

// tslint:disable
interface AddAddressModalProps extends FormComponentProps {
    visible: boolean;
    onClose: () => void;
    dispatch: Dispatch<() => {}>;
}

class AddAddressModal extends React.Component<AddAddressModalProps> {
    handleSubmit = () => {
        const {form, dispatch, onClose} = this.props;
        const {getFieldsValue} = form;
        const addAddressData = getFieldsValue() as StateAddAddressType;
        dispatch(requestAddAddress(addAddressData))
        onClose()
    }

    render() {
        const { visible, onClose, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                onOk={this.handleSubmit}
                onCancel={onClose}
                width={450}
                okText="确认"
                cancelText="取消"
                title="添加新收货地址"
            >
                <Form>
                    <FormItem
                        label="收货人姓名"
                        className="ProfileAddress-AddModalFormItem"
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                formOptions.required,
                            ]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="收货人地址"
                        className="ProfileAddress-AddModalFormItem"
                    >
                        {getFieldDecorator('address', {
                            rules: [
                                formOptions.required,
                            ]
                        })(
                            <Input style={{width: 300}} />
                        )}
                    </FormItem>
                    <FormItem
                        label={<span>邮编</span>}
                        className="ProfileAddress-AddModalFormItem"
                    >
                        {getFieldDecorator('post_code', {
                            rules: [
                                formOptions.required,
                            ]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="联系电话"
                        className="ProfileAddress-AddModalFormItem"
                    >
                        {getFieldDecorator('phone', {
                            rules: [
                                formOptions.required,
                            ]
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default connect()(Form.create({})(AddAddressModal));