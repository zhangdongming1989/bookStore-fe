import { Modal } from 'antd';

export default() => Modal.confirm({
    title: '该操作需要登录之后才能进行',
    okText: '现在去登录',
    cancelText: '暂不登录',
    onOk: () => {
        history.pushState(null, '', '/account/login');
    },
    onCancel: () => { return null; }
});
