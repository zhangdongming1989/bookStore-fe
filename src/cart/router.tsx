import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import CartLayout from './index';
import Cart from './Cart';

export default (
    <Route key="cart" path="cart" component={CartLayout}>
        <IndexRoute key="cart_table" component={Cart} />
    </Route>
);