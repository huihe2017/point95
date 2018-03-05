import React from 'react';
import { Form,Radio,Input,DatePicker,Button,Icon,Select,Upload   } from 'antd';
import style from './index.css';
import UploadImg from '../../../../components/uploadImg'
var Qiniu = require('react-qiniu');
var qiniu = require("qiniu");



function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
}

class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ischange:true,
            url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            url1:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            url2:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            dis:true
        }
    }

    // uptoken(bucket, key) {
    //     var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    //     return putPolicy.token();
    // }
    //
    // token = uptoken(bucket, fileName);
    //
    // getInitialState: function () {
    //     return {
    //         files: [],
    //         token: this.uptoken(),
    //
    //     };
    // }

    componentWillMount(){

        var putPolicy = new qiniu.rs.PutPolicy('point95');
        qiniu.conf.ACCESS_KEY ='BzN7Apb-vCMmeNYqM720qePENoBDsSVKfn-tuoxC' ;
        qiniu.conf.SECRET_KEY ='a96qIIB0PP6A3GEvs0VjMoznuO-j2QCfSx_aRXNU' ;
        console.log(putPolicy.token())
        return putPolicy.token();
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

                        <UploadImg
                            file={file1.length==1?file1:[]}
                            onChange={(url) => {this.setState({url1: url})}}
                            tip="点击上传国徽面"
                            dis={this.state.dis}
                        />

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


