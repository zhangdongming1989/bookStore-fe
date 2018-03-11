import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from './redux/createStore';
import routes from './router';
import registerServiceWorker from './registerServiceWorker';
import { API_ROOT } from './constants';
import './index.css';
//tslint:disable

const renderRoot = (currentUserState: CurrentUserType) => {
    const initialRootState = {
        profile: {
            currentUser: currentUserState,
            accountInfo: null,
            accountInfoLog: null,
            bookListObject: {
                buy: {
                    default: [],
                    return: [],
                    closed: [],
                },
                sell: {
                    default: [],
                    return: [],
                    closed: [],
                }

            },
            bookListDetail: {},
            address: null,
            upload: {
                message: '',
                loading: false,
                result: null,
            },
            storeBookList: [],
            orderAddressMap: {}
        },
    }

    ReactDOM.render(
        <Provider store={configureStore(initialRootState)}>
            <Router history={browserHistory} routes={routes} />
        </Provider>,
        document.getElementById('root') as HTMLElement
    )
    registerServiceWorker();
}

window.fetch(`${API_ROOT}/profile/query`, {credentials: 'include' })
    .then(res => res.json())
    .then(res => {
        const { status, err_code, payload } = res
        if(status === 'fail' && err_code === 401) {
            renderRoot(null)
        } else if ((status === 'ok')) {
            renderRoot(payload)
        } else {
            alert('未知错误！');
        }
    })