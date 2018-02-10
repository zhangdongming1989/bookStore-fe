import * as React from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class BookList extends React.Component {
    render() {
        return (
            <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" title={<span><span>Navigation One</span></span>}>
                    <Menu.Item key="0"><Link to="/profile/index">个人中心</Link></Menu.Item>
                    <MenuItemGroup key="g1" title="订单中心">
                        <Menu.Item key="1"><Link to="/profile/list">订单列表</Link></Menu.Item>
                        <Menu.Item key="2">退货列表</Menu.Item>
                        <Menu.Item key="3">退款列表</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup key="g2" title="账户中心">
                        <Menu.Item key="4">我的银行</Menu.Item>
                        <Menu.Item key="5">系统消息</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
        );
    }
}