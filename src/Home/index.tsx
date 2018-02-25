import * as React from 'react';
import { List } from 'antd';
// import Carousel from '../components/Carousel';
// import imgList from '../img/list';
import SearchBar from '../components/SearchBar';
import './index.css';

const mockList = [
    '博文远景书网上线啦！',
    '本站支持按 ISBN 和书名搜索',
    '本站支持查看个人信息',
    '请将你想购买的图书加入购物车',
];

export default class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <div className="Home-Title">博文远景书网</div>
                <SearchBar className="Home-SearchBar" />
                <List
                    className="Home-List"
                    header={<h3>系统公告</h3>}
                    bordered={false}
                    dataSource={mockList}
                    renderItem={(item: string) => (<List.Item>{item}</List.Item>)}
                />
                {/*<h3>合作伙伴</h3>*/}
                {/*<Carousel imgList={imgList} />*/}
            </div>
        );
    }
}