import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { storeBookRequest } from '../../redux/profile/actions';
import * as Table from 'antd/es/table';
import { RootState } from '../../redux/types';

interface StoreListProps {
    dispatch: Dispatch<() => {}>;
    storeBookList: StoreBookItemType[];
}

export const columns: Table.ColumnProps<StoreBookItemType>[] = [
    {
        key: 'isbn',
        title: 'ISBN',
        dataIndex: 'isbn',
        width: 200,
    },
    {
        key: 'name',
        title: '书名',
        dataIndex: 'name',
        width: 100,
    },
    {
        key: 'author',
        title: '作者',
        dataIndex: 'author',
        width: 100,
    },
    {
        key: 'press',
        title: '出版社',
        dataIndex: 'press',
        width: 200,
    },
    {
        key: 'price',
        title: '价格',
        dataIndex: 'price',
        width: 100,
    },
    {
        key: 'quantity',
        title: '数量',
        dataIndex: 'quantity',
        width: 100,
    }
];

class StoreList extends React.Component<StoreListProps> {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(storeBookRequest());
    }

    render() {
        const {storeBookList} = this.props;

        return (
            <Table.default
                rowKey={(item: StoreBookItemType) => item.id}
                columns={columns}
                dataSource={storeBookList}
            />
        );
    }
}

const mapStateToProps = (state: RootState)  => {
    return {
      storeBookList: state.profile.storeBookList
    };
};

export default connect(mapStateToProps)(StoreList);