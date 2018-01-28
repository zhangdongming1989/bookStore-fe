import * as React from 'react';
import { Card } from 'antd';
import 'particles.js';
import * as cx from 'classnames';
import particlesConfig from '../config/particles';

interface Props {
    children: React.ReactNode;
    location: {
        pathname: string;
    };
}

export default class AccountLayout extends React.Component <Props, {}> {
    componentDidMount() {
        // tslint:disable
        window['particlesJS']('particles-js', particlesConfig)
    }

    render() {
        const {children, location: {pathname}} = this.props;
        const isLoginRoute = pathname.includes('login')
        const isRegisterRoute = pathname.includes('register')
        return (
            <div className="account-Layout" id="particles-js">
                <Card className={cx({'account-LoginCard': isLoginRoute, 'account-RegisterCard': isRegisterRoute})}>
                    <div className="account-CardTitle">
                        {isRegisterRoute && '注册'}
                        {isLoginRoute && '登录'}
                    </div>
                  {children}
                </Card>
            </div>
        );
    }
}
