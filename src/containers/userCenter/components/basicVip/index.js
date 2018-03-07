import React from 'react';
import { Form,Radio,Input,DatePicker,Button,Icon,Select,Upload, message  } from 'antd';
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
            url:'',
            url1:'',
            url2:'',
            dis:false,
            token: '',
            url11:'',
            url22:'',
            url33:'',
            canChange:false
        }
    }

    componentWillMount(){
        var that=this;

        //获取初级认证的资料
        axios.get('http://192.168.100.105:8000/primaryAuthMsg', {params:{
            token:localStorage.getItem('token')
        }}).then(function (response) {
            console.log(response.data.result["0"].primaryCertified);
            that.setState({
                primaryCertified:response.data.result["0"].primaryCertified
            })
            if(response.data.result["0"].primaryCertified==2){
                that.setState({
                    url:'',
                    url1:'',
                    url2:'',

                })
            }else {
                that.setState({
                    url:response.data.result["0"].frontCard,
                    url1:response.data.result["0"].backCard,
                    url2:response.data.result["0"].handCard,
                    canChange:true
                })
            }

        }).catch(function (error) {
            console.log(error);
        })

        //获取七牛的token
        var accessKey = 'BzN7Apb-vCMmeNYqM720qePENoBDsSVKfn-tuoxC';
        var secretKey = 'a96qIIB0PP6A3GEvs0VjMoznuO-j2QCfSx_aRXNU';
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var putPolicy = new qiniu.rs.PutPolicy({
            scope: "point-95",
        });
        var uploadToken=putPolicy.uploadToken(mac);
        that.setState({
            token: uploadToken
        })

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
        //提交初级认证资料
        axios.post('http://192.168.100.105:8000/primaryAuth',
            {
                frontCard: this.state.url,
                backCard: this.state.url1,
                handCard: this.state.url2,
                token:localStorage.getItem('token')
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
        var ex=files[0].name.slice(l1,100);
        var ll=files[0].preview;

        console.log('http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex);
        this.setState({
            url:'http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex+'?imageView2/2/w/308/h/210/interlace/1/q/100',
            url11:files[0].preview
        },()=>{
            var that=this;
            axios.get(this.state.url)
                .then(function (response) {
                console.log(159,response)
                }).catch(function (error) {

                that.setState({
                    isLink11:true
                })

            })
    })}

    onDrop2(files) {
        this.setState({
            files: files
        });
        var l1=files[0].name.indexOf('.');
        // var l2=files[0].name.split('').length;
        var ex=files[0].name.slice(l1,100);
        var ll=files[0].preview;
        console.log('http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex);
        this.setState({
            url1:'http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex+'?imageView2/2/w/308/h/210/interlace/1/q/100',
            url22:files[0].preview
        },()=>{

            var that=this;
            axios.get(this.state.url1)
                .then(function (response) {
                    console.log(159,response)
                }).catch(function (error) {
                console.log('chulai')
                that.setState({
                    isLink22:true
                })
            })
        })
    }


    onDrop3(files) {
        this.setState({
            files: files
        });
        var l1=files[0].name.indexOf('.');
        // var l2=files[0].name.split('').length;
        var ex=files[0].name.slice(l1,100);
        var ll=files[0].preview;

        console.log('http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex);
        this.setState({
            url2:'http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex+'?imageView2/2/w/308/h/210/interlace/1/q/100',
            url33:files[0].preview
        },()=>{
            var that=this;
            console.log(153,this);
            axios.get(this.state.url2)
                .then(function (response) {
                    console.log(159,response)
                }).catch(function (error) {

                that.setState({
                    isLink33:true
                })

            })
        })
    }

    reword(){
        if(this.state.primaryCertified==1){
            return '审核中';

        }else if(this.state.primaryCertified==2){
            return '提交'

        }else if(this.state.primaryCertified==3){
            return '审核通过'
        }
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
                {/*<span style={this.state.dis?{color:'blue'}:{color:'#ccc'}} className={style.showstate}>{this.state.dis?'审核中':'未审核'}</span><br/>*/}

                <div className={style.idbox}>
                    <span className={style.id}>身份证</span>
                    <div className={style.lupingbox}>
                        <div className={style.boxs} style={this.state.canChange?{'display':'block'}:{'display':'none'}}></div>
                        <QQiniu onDrop={this.onDrop1.bind(this)} size={150} token={this.state.token}  onUpload={this.onUpload}>
                            <div>点击上传身份证正面</div>
                            <img className={style.egimg} src={this.state.isLink11?this.state.url11:this.state.url} alt=""/>
                        </QQiniu>
                    </div>
                    <div className={style.rupingbox}>
                        <div className={style.boxs} style={this.state.canChange?{'display':'block'}:{'display':'none'}}></div>
                            <QQiniu onDrop={this.onDrop2.bind(this)} size={150} token={this.state.token}  onUpload={this.onUpload}>
                                <div>点击上传身份证反面</div>
                                <img  className={style.egimg} src={this.state.isLink22?this.state.url22:this.state.url1} alt=""/>
                            </QQiniu>
                    </div>
                </div>


                <div className={style.idbox}>
                    <span className={style.id}>银行卡</span>
                    <div className={style.lupingbox}>
                        <div className={style.boxs} style={this.state.canChange?{'display':'block'}:{'display':'none'}}></div>
                        <QQiniu onDrop={this.onDrop3.bind(this)} size={150} token={this.state.token}  onUpload={this.onUpload}>
                            <div>点击上传银行卡正面</div>
                            <img className={style.egimg} src={this.state.isLink33?this.state.url33:this.state.url2} alt=""/>
                        </QQiniu>
                    </div>
                </div>
                <div className={style.but}>
                    <Button type="primary" onClick={this.click.bind(this)} disabled={this.state.canChange} size='large'>
                        {this.reword()}
                    </Button>
                </div>

            </div>
        )
    }
}

const WrapUserData = Form.create()(UserData);
export default WrapUserData;


