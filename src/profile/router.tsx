import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import Profile from './index';
import BookList from './BookList';
import AccountInfo from './AccountInfo';
import CurrentUser from './CurrentUser';

export default (
    <Route key="profile" path="profile" component={Profile}>
        <IndexRoute component={AccountInfo} />
        <Route key="list" path="book_list" component={BookList} />
        <Route key="user_info" path="user_info" component={CurrentUser} />
    </Route>
);