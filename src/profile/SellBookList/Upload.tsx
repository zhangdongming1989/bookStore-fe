import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Modal, notification } from 'antd';
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
            <div>
                <Dragger
                    style={{padding: '15px 0'}}
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
                    点击选择或拖拽文件到本区域
                </Dragger>
                <Button
                    style={{margin: '10px auto', display: 'block', width: 100}}
                    type="primary"
                    size="large"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0 || loading}
                    loading={loading}
                >
                    导入
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
