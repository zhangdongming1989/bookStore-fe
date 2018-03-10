import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import AccountRoutes from './account/router';
import ProfileRoutes from './profile/router';
import SearchRoutes from './search/router';
import CartRoutes from './cart/router';
import AdminRoutes from './admin/router';

const routes = [
    <IndexRoute key="index" component={Home} />,
    AccountRoutes,
    ProfileRoutes,
    SearchRoutes,
    CartRoutes,
    AdminRoutes,
];

export default (
    <Route path="/" component={App}>
        {routes}
    </Route>
);
