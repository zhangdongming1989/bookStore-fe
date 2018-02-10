import * as React from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import 'particles.js';
import * as cx from 'classnames';
import particlesConfig from '../config/particles';
import { State as AccountState } from '../redux/account';
import { RootState } from '../redux/storeConfigure';

interface Props {
    children: React.ReactNode;
    location: {
        pathname: string;
    };
    dispatch: Dispatch<() => {}>;
    account: AccountState;
}

class AccountLayout extends React.Component <Props, {}> {
    componentDidMount() {
        // tslint:disable
        window['particlesJS']('particles-js', particlesConfig)
    }

    render() {
        const {children, location: {pathname}, dispatch} = this.props;
        const isLoginRoute = pathname.includes('login')
        const isRegisterRoute = pathname.includes('register')
        return (
            <div className={cx('account-Layout', {'account-Layout--register': isRegisterRoute})} id="particles-js">
                <Card className={cx({'account-LoginCard': isLoginRoute, 'account-RegisterCard': isRegisterRoute})}>
                    <div className="account-CardTitle">
                        {isRegisterRoute && '注册'}
                        {isLoginRoute && '登录'}
                    </div>
                    {React.cloneElement(children as React.ReactElement<any>, {
                        dispatch,
                    })}
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        account: state.account,
    };
};

export default connect(mapStateToProps)(AccountLayout)
