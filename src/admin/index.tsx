import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { InjectedRouter } from 'react-router';
import { RootState } from '../redux/types';

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
        const {} = props;
    }
    render() {
        return (
            <div>admin</div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.profile.currentUser
    };
};

export default connect(mapStateToProps)(Admin);