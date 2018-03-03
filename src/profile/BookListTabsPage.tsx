import * as React from 'react';
import { Tabs } from 'antd';
import { connect, Dispatch } from 'react-redux';
import { requestBookList } from '../redux/profile/actions';
import BookList from './BookList';
import { RootState } from '../redux/types';

const TabPane = Tabs.TabPane;

interface BookListTabsPageProps {
    dispatch: Dispatch<() => {}>;
    bookListObject:  BookListObjectType;
}

class BookListTabsPage extends React.Component<BookListTabsPageProps> {
    componentDidMount() {
        this.handleQueryBookList();
    }

    handleQueryBookList = (type?: ActionOrderPayloadType) => {
        const { dispatch } = this.props;
        dispatch(requestBookList(type));
    }
    render() {
        const {default: defaultList, return: returnList, closed: closedList} = this.props.bookListObject;

        return (
            <Tabs defaultActiveKey="all" onChange={(key: ActionOrderPayloadType) => this.handleQueryBookList(key)}>
                <TabPane tab="全部" key="default"><BookList bookList={defaultList} /></TabPane>
                <TabPane tab="待发货" key="return"><BookList bookList={returnList} /></TabPane>
                <TabPane tab="已关闭" key="closed"><BookList bookList={closedList} /></TabPane>
                {/*<TabPane tab=""><BookList bookList={[]} /></TabPane>*/}
            </Tabs>
        );
    }
}
const mapStateToProps = (state: RootState) => {
    return {
        bookListObject: state.profile.bookListObject || []
    };
};
export default connect(mapStateToProps)(BookListTabsPage);