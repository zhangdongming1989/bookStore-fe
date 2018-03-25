import * as React from 'react';
const alipayQrCode = require('../img/alipay_qrcode.jpg');
const wechatQrCode = require('../img/wechat_qrcode.jpg');

const size = {width: 300, height: 450};

export default class QrCode extends React.Component {
    render() {
        return (
            <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', margin: '20px 0'}}>
                    <img src={alipayQrCode} {...size} />
                    <img src={wechatQrCode} {...size} />
                </div>
                <h3>客服QQ: 2141304837</h3>
                <h3>主管客服QQ: 516205526</h3>
            </div>
        );
    }
}