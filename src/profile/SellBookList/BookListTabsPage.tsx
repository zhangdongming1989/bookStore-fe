import * as React from 'react';
import { Tabs } from 'antd';
import { connect, Dispatch } from 'react-redux';
import { requestBookList } from '../../redux/profile/actions';
import BookList from './BookList';
import { RootState } from '../../redux/types';

const TabPane = Tabs.TabPane;

interface BookListTabsPageProps {
    dispatch: Dispatch<() => {}>;
    bookListObject:  BookListObjectType;
}

class BookListTabsPage extends React.Component<BookListTabsPageProps> {
    componentDidMount() {
        this.handleQueryBookList();
    }

    handleQueryBookList = (type?: ActionOrderStatus) => {
        const { dispatch } = this.props;
        dispatch(requestBookList('sell', type));
    }
    render() {
        const {selling: sellingList, sold: soldList} = this.props.bookListObject.sell;

        return (
            <Tabs defaultActiveKey="selling" onChange={(key: ActionOrderStatus) => this.handleQueryBookList(key)}>
                <TabPane tab="处理中" key="selling"><BookList bookList={sellingList} /></TabPane>
                <TabPane tab="已完成" key="sold"><BookList bookList={soldList} /></TabPane>
                {/*<TabPane tab=""><BookList bookList={[]} /></TabPane>*/}
            </Tabs>
        );
    }
}
const mapStateToProps = (state: RootState) => {
    return {
        bookListObject: state.profile.bookListObject
    };
};
export default connect(mapStateToProps)(BookListTabsPage);