import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
    List,
    // Icon,
    Card,
    Button,
    Alert,
} from 'antd';
import { requestSearch } from '../redux/search/actions';
import { Location } from 'history';
import { RootState } from '../redux/types';
const coverImg = require('../img/default_cover.png');
import './index.css';

// const IconText = ({ type, text }) => (
//     <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//         {text}
//   </span>
// );

//tslint:disable
interface SearchProps {
    dispatch: Dispatch<() => {}>;
    location: Location;
    dataList: StateSearchResultListType;
}

class Search extends React.Component<SearchProps> {
    componentDidMount() {
        const {dispatch, location} = this.props;
        const {t = 'name', q} = location.query
        dispatch(requestSearch(t, q));
    }
    render() {
        const { dataList, location } = this.props;
        const {q} = location.query
        const pagination = {
            pageSize: 10,
            current: 1,
            total: dataList.length,
            onChange: (() => {}),
        };
        const hasResult = dataList && dataList.length > 0
        return (
            <div>
                {hasResult ?
                    <Alert className="Search-Alert" type="success" message={`以下是「${q}」的搜索结果`} /> :
                    <Alert className="Search-Alert" type="error" message={`未找到「${q}」的搜索结果`} />
                }
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={pagination}
                    dataSource={dataList}
                    className="Search-List"
                    renderItem={(item: StateSearchResultType) => {
                        const {isbn, supplier, price, quantity = 0, } = item
                        const canBuy = quantity && (Number(quantity) > 0)
                        return (
                        <Card>
                            <List.Item
                                key={item.id}
                                actions={[
                                    <span key="isbn">ISBN: {isbn}</span>,
                                    <span key="supplier" >供货商：{supplier}</span>,
                                    <span key="price">售价: {price}</span>,
                                    <span key="quantity">库存量：{quantity}</span>
                                ]}
                                extra={
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <img width={200} alt="cover" src={coverImg} />,
                                        <Button
                                            type={quantity ? 'primary' : 'danger'}
                                            disabled={!canBuy}
                                        >
                                            {canBuy ? '加入购物车' : '暂时缺货'}
                                        </Button>
                                    </div>
                                }
                            >
                                <List.Item.Meta
                                    title={<span>{item.name}</span>}
                                    description={item.description}
                                />
                            </List.Item>
                        </Card>
                    )}}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        dataList: state.search.dataList
    }
}

export default connect(mapStateToProps)(Search);