import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import List from 'antd/lib/list';
import { RootState } from '../redux/types';

//tslint:disable
interface CurrentUserProps {
    currentUser: StateCurrentUserType;
    dispatch: Dispatch<() => {}>;
}

interface ItemProps {
    key: string;
    value: string;
}

const currentUserMap = {
    username: '用户名',
    nickname: '昵称',
    realname: '真实姓名',
    phone: '手机号码',
    gender: '性别',
    mail: '邮箱',
    qq: 'QQ',
}
class CurrentUser extends React.Component<CurrentUserProps> {
    render() {
        const {currentUser} = this.props
        const currentUserDataList = Object.keys(currentUser)
            .filter(key => (key !== 'password'))
            .map(key => ({key, value: currentUser[key]}))
        return (
            <List
                className="ProfileCurrentUser-Wrapper"
                dataSource={currentUserDataList}
                itemLayout="horizontal"
                renderItem={(item: ItemProps) => {
                    const {key, value} = item;
                    return (
                        <List.Item
                            className="ProfileCurrentUser-Item"
                        >
                            <List.Item.Meta
                                title={<div>{currentUserMap[key]}:</div>}
                            />
                            <div style={{ marginRight: 20 }}>{value}</div>
                        </List.Item>
                    )
                }
                }
            />
      );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.profile.currentUser
    };
}

export default connect(mapStateToProps)(CurrentUser);