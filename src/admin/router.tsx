import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import AdminLayout from './index';
import Recharge from './Recharge/Recharge';

export default (
    <Route key="admin" path="admin" component={AdminLayout}>
        <IndexRoute key="index" component={Recharge}  />
    </Route>
);