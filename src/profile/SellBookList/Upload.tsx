import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Modal, notification, Icon } from 'antd';
import * as UploadComponent from 'antd/es/upload';
import { RootState } from '../../redux/types';
import { uploadRequest } from '../../redux/profile/actions';
import { UploadFile } from 'antd/lib/upload/interface';
const Dragger = UploadComponent.default.Dragger;
export const EXCEL_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

interface Props {
    loading: boolean;
    result: string;
    message: string;
    dispatch: Dispatch<() => {}>;
}

class Upload extends React.Component<Props, {fileList: UploadFile[]}> {
    state = {
        fileList: [],
    };

    handleUpload = () => {
        const file = this.state.fileList[0];
        const {dispatch} = this.props;
        if (file) {
            dispatch(uploadRequest(file));
            this.setState({fileList: []});
        }
    }

    handleCloseModal = () => {
        // const {dispatch} = this.props;
        // const file = this.state.fileList[0];
        // if (file) {
        //     dispatch(uploadRequest(file));
        //     this.setState({fileList: []});
        // }
    }

    render() {
        const {loading, result, message} = this.props;
        const {fileList} = this.state;
        return (
            <div style={{width: '100%', padding: 20}}>
                <Dragger
                    style={{padding: '15px 0', width: '100%'}}
                    accept={EXCEL_MIME_TYPE}
                    fileList={this.state.fileList}
                    beforeUpload={(file) => {
                        if (fileList[0]) {
                            notification.error({
                                message: 'ops! 出错了。。。',
                                description: '目前只支持一次上传一个文件',
                            });
                        } else {
                            this.setState({fileList: [...fileList, file]});
                        }
                        return false;
                    }}
                    onRemove={(file) => {
                        this.setState(state => {
                            const index = state.fileList.indexOf(file);
                            return {
                                fileList: [...fileList.slice(0, index), ...fileList.slice(index + 1)]
                            };
                        });
                    }}
                >
                    <div
                        style={{
                            height: 200,
                            backgroundColor: '#d9d9d9',
                            opacity: 0.5,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                        }}
                    >
                        <p style={{fontSize: 40, color: 'blue'}}>
                            <Icon type="inbox" />
                        </p>
                        <p>点击或者将文件拖拽进灰色区域，暂时只支持一次上传一个 xlsx 文件</p>
                    </div>
                </Dragger>
                <Button
                    style={{margin: '10px auto', display: 'block', width: 100}}
                    type="primary"
                    size="large"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0 || loading}
                    loading={loading}
                >
                    上传
                </Button>
                <Modal
                    title={result ? '成功啦！' : 'ops! 出问题了'}
                    visible={result !== null}
                    onOk={this.handleCloseModal}
                    onCancel={this.handleCloseModal}
                >
                    {result ? <p>{message || '导入成功！'}</p> : <p>{message}</p>}
                </Modal>
            </div>
        );
    }
}

const mapStateToProp = (state: RootState) => {
    const {loading, result, message} = state.profile.upload;
    return {
        loading,
        result,
        message,
    };
};
export default connect(mapStateToProp)(Upload);
