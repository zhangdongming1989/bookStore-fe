import * as React from 'react';
import ProfileMenu from './ProfileMenu';
import './index.css';

export default class Profile extends React.Component {
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