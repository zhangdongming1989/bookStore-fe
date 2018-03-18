import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Table from 'antd/es/table';
import { RootState } from '../redux/types';
import { queryAllSellerList } from '../redux/profile/actions';
import { Button } from 'antd';
import { API_ROOT }  from '../constants';
import { createExcel } from '../components/ExportFile';
import { columns } from './SellBookList/StoreList';


//tslint:disable
interface SellerListProps {
    dispatch: Dispatch<() => {}>;
    sellerList: SellerListType[];
}

class SellerList extends React.Component<SellerListProps> {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(queryAllSellerList());
    }

    handleDownloadBookList = (record: SellerListType) => {
        window.fetch(`${API_ROOT}/book/query_by_supplier_id/${record.user_id}`, {credentials: 'include' })
            .then(res => {
                return res.json()
            }).then((data) => {
                const dataList = Object.values(data.payload)
            createExcel(dataList, columns, `bookList_${record.user_id}_${record.nickname}`)
        })
    }

    render() {
        const column: Table.ColumnProps<SellerListType>[] = [
            {
                key: 'user_id',
                title: '用户ID',
                dataIndex: 'user_id',
            },
            {
                key: 'nickname',
                title: '昵称',
                dataIndex: 'nickname'
            },
            {
                key: 'operator',
                title: '操作',
                render: (_, record: SellerListType) => {
                    return (
                        <Button onClick={() => this.handleDownloadBookList(record)}>下载该卖家可提供书目</Button>
                    );
                }
            }
        ];
        const {sellerList} = this.props;
        return (
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <Table.default
                    columns={column}
                    dataSource={sellerList}
                />
            </div>
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        sellerList: state.profile.sellerList,
    };
};

export default connect(mapStateToProps)(SellerList);
