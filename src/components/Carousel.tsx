import * as React from 'react';
import { Carousel as AntdCarousel } from 'antd';
import './Carousel.css';

interface Props {
    imgList: string[];
}

export default class Carousel extends React.Component<Props, {}> {
    render() {
        const {imgList} = this.props;
        return (
            <AntdCarousel
                autoplay={true}
                className="Home-Carousel"
            >
                {imgList.map((img, index) => {
                    return (
                        <div key={index}>
                            <img src={img} alt={img} className="Home-Img" />
                        </div>
                    );
                })}
            </AntdCarousel>
       );
    }
}