import React from 'react';
import { Form,Radio,Input,DatePicker,Button,Icon,Select,Upload   } from 'antd';
import style from './index.css';
import UploadImg from '../../../../components/uploadImg'
import QQiniu from 'react-qiniu';
import qiniu from "qiniu";
import axios from  '../../../../common/axiosConf'



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
            dis:false,
            token: '',
        }
    }

    // uptoken(bucket, key) {
    //     var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    //     return putPolicy.token();
    // }w
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
        axios.post('http://192.168.100.105:8000/primaryAuth', {
            frontCard: this.state.url,
            backCard: this.state.url1,
            handCard: this.state.url2
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    onUpload(files) {
        // set onprogress function before uploading
        files.map(function (f) {
            f.onprogress = function(e) {
                console.log(e.percent);
            };
        });
    }
    onDrop1(files) {
        this.setState({
            files: files
        });
        // files is a FileList(https://developer.mozilla.org/en/docs/Web/API/FileList) Object
        // and with each file, we attached two functions to handle upload progress and result
        // file.request => return super-agent uploading file request
        // file.uploadPromise => return a Promise to handle uploading status(what you can do when upload failed)
        // `react-qiniu` using bluebird, check bluebird API https://github.com/petkaantonov/bluebird/blob/master/API.md
        // see more example in example/app.js

        var l1=files[0].name.indexOf('.');
        // var l2=files[0].name.split('').length;
        var ex=files[0].name.slice(l1,100);
        var ll=files[0].preview;
        console.log('http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex);
        this.setState({
            url:'http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex
        })
    }
    onDrop2(files) {
        this.setState({
            files: files
        });
        // files is a FileList(https://developer.mozilla.org/en/docs/Web/API/FileList) Object
        // and with each file, we attached two functions to handle upload progress and result
        // file.request => return super-agent uploading file request
        // file.uploadPromise => return a Promise to handle uploading status(what you can do when upload failed)
        // `react-qiniu` using bluebird, check bluebird API https://github.com/petkaantonov/bluebird/blob/master/API.md
        // see more example in example/app.js

        var l1=files[0].name.indexOf('.');
        // var l2=files[0].name.split('').length;
        var ex=files[0].name.slice(l1,100);
        var ll=files[0].preview;
        console.log('http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex);
        this.setState({
            url1:'http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex
        })
    }
    onDrop3(files) {
        this.setState({
            files: files
        });
        // files is a FileList(https://developer.mozilla.org/en/docs/Web/API/FileList) Object
        // and with each file, we attached two functions to handle upload progress and result
        // file.request => return super-agent uploading file request
        // file.uploadPromise => return a Promise to handle uploading status(what you can do when upload failed)
        // `react-qiniu` using bluebird, check bluebird API https://github.com/petkaantonov/bluebird/blob/master/API.md
        // see more example in example/app.js

        var l1=files[0].name.indexOf('.');
        // var l2=files[0].name.split('').length;
        var ex=files[0].name.slice(l1,100);
        var ll=files[0].preview;
        console.log('http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex);
        this.setState({
            url2:'http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex
        })
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
                        <QQiniu onDrop={this.onDrop1.bind(this)} size={150} token={this.state.token}  onUpload={this.onUpload}>
                            <div>点击上传身份证正面</div>
                        </QQiniu>
                    </div>
                    <div className={style.rupingbox}>
                            <QQiniu onDrop={this.onDrop2.bind(this)} size={150} token={this.state.token}  onUpload={this.onUpload}>
                                <div>点击上传身份证反面</div>
                            </QQiniu>
                    </div>
                </div>


                <div className={style.idbox}>
                    <span className={style.id}>银行卡</span>
                    <div className={style.lupingbox}>
                        <QQiniu onDrop={this.onDrop3.bind(this)} size={150} token={this.state.token}  onUpload={this.onUpload}>
                            <div>点击上传银行卡正面</div>
                        </QQiniu>
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


