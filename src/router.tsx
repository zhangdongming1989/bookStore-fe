import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import AccountRoutes from './account/router';
import ProfileRoutes from './profile/router';
import SearchRoutes from './search/router';

const routes = [
    <IndexRoute key="index" component={Home} />,
    AccountRoutes,
    ProfileRoutes,
    SearchRoutes,
];

export default (
    <Route path="/" component={App}>
        {routes}
    </Route>
);
