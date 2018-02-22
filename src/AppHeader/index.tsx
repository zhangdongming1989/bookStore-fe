import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import { requestLogout } from '../redux/profile/actions';
import { requestCart } from '../redux/cart/actions';
import SearchBar from '../components/SearchBar';
import './index.css';
import { RootState } from '../redux/types';

const SubMenu = Menu.SubMenu;

interface Props {
    currentUser: StateCurrentUserType;
    dispatch: Dispatch<() => {}>;
    cart: StateCartType[];
}

class AppHeader extends React.Component<Props, {}> {
    componentDidMount() {
        const { dispatch, currentUser} = this.props;
        if (currentUser) {
            dispatch(requestCart());
        }
    }

    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(requestLogout());
    }

    render() {
        const { currentUser } = this.props;
        return (
            <div className="AppHeader-Wrapper">
              <div className="AppHeader-WrapperContent">
                  <Menu mode="horizontal" className="AppHeader">
                      {
                          currentUser ?
                              <SubMenu title={<span>你好，{currentUser.username}</span>}>
                                  <MenuItem key="profile">
                                      <Link to="/profile/book_list">个人中心</Link>
                                  </MenuItem>
                                  <MenuItem key="logout">
                                      <div onClick={this.handleLogout}>登出</div>
                                  </MenuItem>
                              </SubMenu> :
                              [
                                  <MenuItem key="register">
                                      <Link to="/account/register">注册</Link>
                                  </MenuItem>,
                                  <MenuItem key="login">
                                      <Link to="/account/login">登录</Link>
                                  </MenuItem>
                              ]
                      }
                      {
                          currentUser &&
                          <MenuItem>
                              <Link to="cart" >购物车</Link>
                          </MenuItem>
                      }

                  </Menu>
                  <SearchBar />
                  <Link to="/">首页</Link>
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.profile.currentUser,
        cart: state.cart.cart
    };
};

export default connect(mapStateToProps)(AppHeader);
