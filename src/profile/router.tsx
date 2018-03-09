import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import Profile from './index';
import AccountInfo from './AccountInfo';
import CurrentUser from './CurrentUser';
import Address from './Address';
import BuyBookListPage from './BookList/BookListTabsPage';
import SellBookListPage from './SellBookList/BookListTabsPage';
import UpLoad from './SellBookList/Upload';

export default (
    <Route key="profile" path="profile" component={Profile}>
        <IndexRoute component={AccountInfo} />
        <Route key="buy" path="buy">
            <Route key="buy_book_list" path="book_list" component={BuyBookListPage} />
        </Route>
        <Route key="sell" path="sell">
            <Route key="sell_book_list" path="book_list" component={SellBookListPage} />
            <Route key="sell_upload" path="upload" component={UpLoad} />
        </Route>
        <Route key="user_info" path="user_info" component={CurrentUser} />
        <Route key="address" path="address" component={Address} />
    </Route>
);