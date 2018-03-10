import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { InjectedRouter } from 'react-router';
import { RootState } from '../redux/types';
import AdminMenu from './AdminMenu';
import './index.css';

//tslint:disable
interface Props {
    currentUser: CurrentUserType;
    dispatch: Dispatch<() => {}>;
    router: InjectedRouter;
}

class Admin extends React.Component<Props> {
    componentDidMount() {
        this.checkIfIsAdmin(this.props);
    }

    componentWillReceiveProps(nextProps: Props) {
        this.checkIfIsAdmin(nextProps);
    }

    checkIfIsAdmin = (props = this.props) => {
        const {currentUser, router} = props;
        if (!currentUser || !currentUser.is_admin) {
            router.replace('/');
        }
    }
    render() {
        const {children} = this.props;
        return (
            <div className="Admin">
                <h3 className="Admin-Title">管理员中心</h3>
                <div>
                    <AdminMenu pathname={location.pathname} />
                    {children}
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.profile.currentUser
    };
};

export default connect(mapStateToProps)(Admin);