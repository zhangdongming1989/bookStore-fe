import * as React from 'react';
import { Table, Button } from 'antd';
import { connect, Dispatch } from 'react-redux';
import { RootState } from '../redux/types';
import { requestAddress, requestDeleteAddress, requestSetDefaultAddress } from '../redux/profile/actions';
import { ColumnProps } from 'antd/lib/table';
import AddAddressModal from './AddAddressModal';

// tslint:disable
interface AddressProps {
    address: StateAddressType[] | null;
    dispatch: Dispatch<() => {}>;
}

class Address extends React.Component<AddressProps> {
    state={
        showModal: false
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(requestAddress());
    }

    handleToggleModal = () => {
        this.setState({showModal: !this.state.showModal})
    }

    handleDelete = (item: StateAddressType) => {
        const {dispatch} = this.props
        dispatch(requestDeleteAddress(item.id))
    }

    handleSetDefault = (item: StateAddressType) => {
        const {dispatch} = this.props
        dispatch(requestSetDefaultAddress(item.id))
    }

    render() {
        const {address} = this.props;
        const { showModal } = this.state
        if (!address) { return null; }
        const columns: ColumnProps<StateAddressType>[] = [
            {
                title: '收件人',
                dataIndex: 'name',
                width: 100,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 200,

            },
            {
                title: '邮编',
                dataIndex: 'post_code',
                width: 150,
            },
            {
                title: '手机',
                dataIndex: 'phone',
                width: 150,

            },
            {
                title: '备注',
                key:"extra",
                width: 100,
                render: ((_,item: StateAddressType) => {
                    const {is_default} = item
                    return (
                        <div>
                            {is_default ? '默认地址' : ''}
                        </div>
                    )
                })
            },
            {
                key: 'operator',
                title: '操作',
                render: ((_, item: StateAddressType) => {
                    const {is_default} = item
                    return (
                        <div style={{display: 'flex'}}>
                            <Button
                                onClick={() => {this.handleDelete(item)}}
                                size="small"
                            >
                                删除
                            </Button>
                            {
                                !is_default && <Button
                                    onClick={() => {this.handleSetDefault(item)}}
                                    size="small"
                                >
                                    标为默认
                                </Button>
                            }
                        </div>
                    )
                })
            }

        ];

        const addressList = address
            .map((addressItem, index) => ({...addressItem, key: index}))

        return (
          <div className="ProfileAddress-Wrapper">
              <div className="ProfileAddress-Add">
                  <Button onClick={this.handleToggleModal}>添加新收货地址</Button>
              </div>
              <Table
                  key="table"
                  columns={columns}
                  pagination={false}
                  dataSource={addressList}
              />
              <AddAddressModal
                  visible={showModal}
                  onClose={this.handleToggleModal}
              />
          </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
       address: state.profile.address
    };
};

export default connect(mapStateToProps)(Address);
