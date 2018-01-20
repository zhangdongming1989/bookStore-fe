import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './router';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
