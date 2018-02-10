import * as React from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import './index.css';

interface Props {

}

export default class AppHeader extends React.Component<Props, {}> {
    render() {
        return (
            <Menu mode="horizontal" className="AppHeader">
                <MenuItem>
                    <Link to="/account/register">注册</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/account/login">登录</Link>
                </MenuItem>
                <div className="AppHeader-Divider" />
                <MenuItem>
                    <Link to="/">首页</Link>
                </MenuItem>
            </Menu>
        );
    }
}