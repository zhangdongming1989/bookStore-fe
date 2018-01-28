import * as React from 'react';
import { Route } from 'react-router';
import AccountLayout from './index';
import Login from './Login';
import Register from './Register';
import './index.css';

export default (
    <Route key="account" path="account" component={AccountLayout}>
        <Route key="login" path="login" component={Login} />
        <Route key="register" path="register" component={Register} />
    </Route>
);