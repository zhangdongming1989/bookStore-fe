import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RootState } from '../redux/types';
// import { ColumnProps } from 'antd/lib/table';

interface CartProps extends DispatchProp<DispatchProp<() => {}>> {
    cartData: StateCartType[];
}

class Cart extends React.Component<CartProps> {
    render() {
        // const columns: ColumnProps<StateCartType>[] = [
        //     {
        //         title: '货源'
        //     },
        //     {
        //         title: 'ISBN',
        //     },
        //     {
        //         title: '书名',
        //     },
        //     {
        //         title: '原价',
        //     },
        //     {
        //         title: '折扣',
        //     },
        //     {
        //         title: '会员价'
        //     },
        //     {
        //         title: '总价',
        //     },
        //     {
        //         title: '数量',
        //     },
        //     {
        //         title: '操作',
        //     }
        // ]

        return (
            <div>cart......</div>
        );
    }
}

const mapStateProps = (state: RootState) => {
    return {
      cartData: state.cart.cart,
    };
};

export default connect(mapStateProps)(Cart);