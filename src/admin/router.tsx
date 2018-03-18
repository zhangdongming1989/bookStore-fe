import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import AdminLayout from './index';
import Recharge from './Recharge/Recharge';
import BookAddress from './BookAddress';

export default (
    <Route key="admin" path="admin" component={AdminLayout}>
        <IndexRoute key="index" component={Recharge}  />
        <Route key="book_address" path="book_address" component={BookAddress} />
    </Route>
);