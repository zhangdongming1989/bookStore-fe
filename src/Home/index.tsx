import * as React from 'react';
import { Input, List } from 'antd';
import Carousel from '../components/Carousel';
import imgList from '../img/list';
import './index.css';

const Search = Input.Search;

const mockList = [
    '内容1',
    '内容2',
    '内容3',
    '内容4',
    '内容5',
];

export default class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <div className="Home-Title">博文远景书网</div>
                <Search
                    placeholder="ISBN/书名"
                    className="Home-Search"
                    size="large"
                    enterButton={true}
                />
                <List
                    className="Home-List"
                    header={<h3>系统公告</h3>}
                    bordered={false}
                    dataSource={mockList}
                    renderItem={(item: string) => (<List.Item>{item}</List.Item>)}
                />
                <h3>合作伙伴</h3>
                <Carousel imgList={imgList} />
            </div>
        );
    }
}