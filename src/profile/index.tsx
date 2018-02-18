import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { InjectedRouter } from 'react-router';
import ProfileMenu from './ProfileMenu';
import './index.css';
import { RootState } from '../redux/types';

interface ProfileProps {
    currentUser: CurrentUserType;
    dispatch: Dispatch<() => {}>;
    router: InjectedRouter;
}

//tslint:disable
class Profile extends React.Component<ProfileProps> {
    componentWillMount() {
        this.checkIfNeedRedirect();
    }

    componentWillReceiveProps(nextProps: ProfileProps) {
        this.checkIfNeedRedirect(nextProps);
    }

    checkIfNeedRedirect = (props: ProfileProps = this.props) => {
        const {currentUser, router} = props;
        if (!currentUser) {
            router.push('/');
        }
    }
    render() {
        const { children } = this.props;
        return (
            <div className="Profile">
                <div className="Profile-Menu">
                    <ProfileMenu pathname={location.pathname} />
                </div>
                {children}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.profile.currentUser
    };
};
export default connect(mapStateToProps)(Profile);
