import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import Profile from './index';
import BookListTabsPage from './BookListTabsPage';
import AccountInfo from './AccountInfo';
import CurrentUser from './CurrentUser';
import Address from './Address';

export default (
    <Route key="profile" path="profile" component={Profile}>
        <IndexRoute component={AccountInfo} />
        <Route key="list" path="book_list" component={BookListTabsPage} />
        <Route key="user_info" path="user_info" component={CurrentUser} />
        <Route key="address" path="address" component={Address} />
    </Route>
);