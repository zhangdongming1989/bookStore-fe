import * as React from 'react';
import { Route } from 'react-router';
import Profile from './index';
import BookList from './BookList';

export default (
    <Route key="profile" path="profile" component={Profile}>
        <Route key="book_list" path="list" component={BookList} />
    </Route>
);