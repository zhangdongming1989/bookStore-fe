import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/createStore';
import routes from './router';
import registerServiceWorker from './registerServiceWorker';
// import { API_ROOT } from './constants';
import './index.css';
// //tslint:disable
// window.fetch(`${API_ROOT}/account/query`, {credentials: 'include'  })
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
