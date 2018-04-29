import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import AdminLayout from './index';
import Recharge from './Recharge/Recharge';
import BookAddress from './BookAddress';
import BookListTabsPage from './BookList/BookListTabsPage';
import SellerList from './SellerList';

export default (
    <Route key="admin" path="admin" component={AdminLayout}>
        <IndexRoute key="index" component={Recharge}  />
        <Route key="book_address" path="book_address" component={BookAddress} />
        <Route key="sell_book_list" path="book_list" component={BookListTabsPage}/>
        <Route key="seller_list" path="seller_list" component={SellerList} />
    </Route>
);