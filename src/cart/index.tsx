import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RootState } from '../redux/types';
import { InjectedRouter } from 'react-router';

interface CartProps extends DispatchProp<() => {}> {
    currentUser: StateCurrentUserType;
    router: InjectedRouter;
}

class Cart extends React.Component<CartProps> {
    componentWillMount() {
        const {currentUser, router } = this.props;
        if (!currentUser) {
            router.replace('/');
        }
    }
    render() {
        const { children } = this.props;
        return (
            <div>
                {children}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.profile.currentUser,
    };
};

export default connect(mapStateToProps)(Cart);
