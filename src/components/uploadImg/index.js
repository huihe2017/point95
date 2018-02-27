import React from "react";
import style from "./index.css";

import { Upload, Icon, Modal } from 'antd';

class UploadImg extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: this.props.file,
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    //handleChange = ({ fileList }) => this.setState({ fileList })
    handleChange = ({fileList}) => {
        this.setState({ fileList:fileList },()=>{
            //console.log("gfgg",this.state.fileList[0].response.data)
            this.props.onChange(this.state.fileList[0]&&this.state.fileList[0].response&&this.state.fileList[0].response.data)
        })
    }

    render() {
        console.log(this.props.dis)
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div className={style.uploadTip}>
                <span>
                    {this.props.tip}
                </span>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    disabled={this.props.dis}
                    action="http://47.91.236.245:4030/user/uploads"
                    style={{width:'220',height:'150',position: 'relative',overflow:'hidden'}}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    withCredentials={true}

                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default UploadImg;

// this.props.user.status === "2" ? true : false