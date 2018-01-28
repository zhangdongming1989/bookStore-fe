import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import AccountRoutes from './account/router';

const routes = [
    <IndexRoute key="index" component={Home} />,
    AccountRoutes,
];

export default (
    <Route path="/" component={App}>
        {routes}
    </Route>
);
