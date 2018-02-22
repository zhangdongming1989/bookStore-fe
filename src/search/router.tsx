import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import Search from './Search';

export default (
    <Route key="profile" path="search">
        <IndexRoute component={Search} />
    </Route>
);