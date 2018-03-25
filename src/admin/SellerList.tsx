import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Table from 'antd/es/table';
import { RootState } from '../redux/types';
import { SellerItem } from '../redux/admin/types';
import { requestSellerList } from '../redux/admin/actions';

const mapStateToProps = (state: RootState) => {
    return {
        sellerList: state.admin.sellerList,
    };
};

const columns: Table.ColumnProps<SellerItem>[] = [
    {
        key: 'user_id',
        title: '用户 id',
        dataIndex: 'user_id',
    },
    {
        key: 'nickname',
        title: '昵称',
        dataIndex: 'nickname',
    },
];

interface SellerListProps {
    sellerList: SellerItem[];
    dispatch: Dispatch<() => {}>;
}
class SellerList extends React.Component<SellerListProps> {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(requestSellerList());
    }
    render() {
        const {sellerList} = this.props;
        return (
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <Table.default
                    style={{width: '100%'}}
                    dataSource={sellerList}
                    columns={columns}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(SellerList);