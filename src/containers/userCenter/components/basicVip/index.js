import React from 'react';
import { Form,Radio,Input,DatePicker,Button,Icon,Select,Upload   } from 'antd';
import style from './index.css';
import UploadImg from '../../../../components/uploadImg'
import QQiniu from 'react-qiniu';
import qiniu from "qiniu";



// qiniu.conf.ACCESS_KEY ='BzN7Apb-vCMmeNYqM720qePENoBDsSVKfn-tuoxC' ;
//
// qiniu.conf.SECRET_KEY ='a96qIIB0PP6A3GEvs0VjMoznuO-j2QCfSx_aRXNU' ;

class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            ischange:true,
            url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            url1:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            url2:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            dis:true,
            token: '',
        }
    }

    // uptoken(bucket, key) {
    //     var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    //     return putPolicy.token();
    // }
    // token = uptoken(bucket, fileName);
    //
    // getInitialState: function () {
    //     return {
    //         files: [],
    //         token: this.uptoken(),
    //     };
    // }


    componentWillMount(){
        var that=this;
        var accessKey = 'BzN7Apb-vCMmeNYqM720qePENoBDsSVKfn-tuoxC';
        var secretKey = 'a96qIIB0PP6A3GEvs0VjMoznuO-j2QCfSx_aRXNU';
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var putPolicy = new qiniu.rs.PutPolicy({
            scope: "point-95",
        });
        var uploadToken=putPolicy.uploadToken(mac);

        console.log(321,uploadToken);
        //return putPolicy.token();
        that.setState({
            token: uploadToken
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    changesta(e) {
        this.setState({
            ischange:false
        })

    }
    click(){
        console.log(this.state)
    }
    onUpload(files) {
        // set onprogress function before uploading
        files.map(function (f) {
            f.onprogress = function(e) {
                console.log(e.percent);
            };
        });
    }
    onDrop(files) {
        this.setState({
            files: files
        });
        // files is a FileList(https://developer.mozilla.org/en/docs/Web/API/FileList) Object
        // and with each file, we attached two functions to handle upload progress and result
        // file.request => return super-agent uploading file request
        // file.uploadPromise => return a Promise to handle uploading status(what you can do when upload failed)
        // `react-qiniu` using bluebird, check bluebird API https://github.com/petkaantonov/bluebird/blob/master/API.md
        // see more example in example/app.js
        console.log('Received files: ', files);
    }

    render() {

        const { getFieldDecorator,getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择生日!' }],
        };
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const file=[ {uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: this.state.url}];
        const file1=[ {uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: this.state.url1}];
        const file2=[ {uid: -1,
            name: 'xxx.png',
            status: 'done',
            url:this.state.url2}];



        return (
            <div className={style.wlop}>
                <span style={this.state.dis?{color:'blue'}:{color:'#ccc'}} className={style.showstate}>{this.state.dis?'审核中':'未审核'}</span><br/>

                <div className={style.idbox}>
                    <span className={style.id}>身份证</span>
                    <div className={style.lupingbox}>
                        <UploadImg
                            file={file.length==1?file:[]}
                            onChange={(url) => {this.setState({url: url})}}
                            tip="点击上传人像面"
                            dis={this.state.dis}
                        />
                    </div>
                    <div className={style.rupingbox}>
                            <QQiniu onDrop={this.onDrop.bind(this)} size={150} token={this.state.token}  onUpload={this.onUpload}>
                                <div>Try dropping some files here, or click to select files to upload.</div>
                            </QQiniu>
                    </div>
                </div>


                <div className={style.idbox}>
                    <span className={style.id}>银行卡</span>
                    <div className={style.lupingbox}>
                        <UploadImg
                            file={file2.length==1?file2:[]}
                            onChange={(url) => {this.setState({url2: url})}}
                            tip="点击上传银行卡正面"
                            dis={this.state.dis}/>
                    </div>
                </div>
                <div className={style.but}>
                    <Button type="primary" htmlType="submit" onClick={this.click.bind(this)} disabled={this.state.dis} size='large'>提交</Button>
                </div>

            </div>
        )
    }
}

const WrapUserData = Form.create()(UserData);
export default WrapUserData;


