import React from 'react';
import { Form,Radio,Input,DatePicker,Button,Icon,Select,Upload, message  } from 'antd';
import style from './index.css';
import UploadImg from '../../../../components/uploadImg'
import QQiniu from 'react-qiniu';
import qiniu from "qiniu";
import axios from  '../../../../common/axiosConf'
import Countdown from '../../../../components/countdown/index'
import Toast from 'antd-mobile/lib/toast';
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';
import {forgetPwdSet} from "../../../../actions/user";
import {hideAuth, showLogin} from "../../../../actions/auth";
import {connect} from "react-redux";
import webLink from '../../../../common/webLink'

const FormItem = Form.Item;
const Option = Select.Option;


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
        axios.get(`${webLink}/primaryAuthMsg`, {params:{
            token:localStorage.getItem('token')
        }}).then(function (response) {
            if (response.data.code === 0) {
                message.error(response.data.message);
            }
            that.setState({
                primaryCertified:response.data.result["0"].primaryCertified
            })
            if(response.data.result["0"].primaryCertified==2){
                that.setState({
                    url:'',
                    url1:'',
                    address:'',
                    realName:'',
                    ID:'',
                    thirdParty:null,
                    employStatu:null,
                })
            }else {
                console.log(response.data.result["0"]);
                that.setState({
                    url:response.data.result["0"].frontCard,
                    url1:response.data.result["0"].backCard,
                    address:response.data.result["0"].address,
                    realName:response.data.result["0"].realName,
                    ID:response.data.result["0"].ID,
                    thirdParty:response.data.result["0"].thirdParty,
                    employStatu:response.data.result["0"].employStatu,
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
        var llar=ll.split('')
        //console.log('http://p543qsy5q.bkt.clouddn.com/'+ll.slice(ll.lastIndexOf('/')+1,llar.length)+ex);
        this.setState({
            url:'http://p543qsy5q.bkt.clouddn.com/'+ll.slice(ll.lastIndexOf('/')+1,llar.length)+ex+'?imageView2/2/w/308/h/210/interlace/1/q/100',
            url11:files[0].preview
        },()=>{
            var that=this;
            axios.get(this.state.url)
                .then(function (response) {
                console.log(response)
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
        var llar=ll.split('')
        //console.log('http://p543qsy5q.bkt.clouddn.com/'+ll.slice(ll.lastIndexOf('/')+1,llar.length)+ex);
        this.setState({
            url1:'http://p543qsy5q.bkt.clouddn.com/'+ll.slice(ll.lastIndexOf('/')+1,llar.length)+ex+'?imageView2/2/w/308/h/210/interlace/1/q/100',
            url22:files[0].preview
        },()=>{

            var that=this;
            axios.get(this.state.url1)
                .then(function (response) {
                    //console.log(159,response)
                }).catch(function (error) {
                //console.log('chulai')
                that.setState({
                    isLink22:true
                })
            })
        })
    }


    reword(){
        if(this.state.primaryCertified==1){
            return <FormattedMessage
                id='submit1'
                defaultMessage='提交'
            />;

        }else if(this.state.primaryCertified==2){
            return <FormattedMessage
                id='submit2'
                defaultMessage='提交'
            />

        }else if(this.state.primaryCertified==3){
            return <FormattedMessage
                id='submit3'
                defaultMessage='提交'
            />
        }
    }

    handleSubmit = (e) => {
        var that=this
        e.preventDefault();
        if(!this.state.url&&!this.state.url1){
            message.error(this.props.auth.isEnglish?'Please upload pictures.':'请上传图片')
            return
        }else if(!this.state.url){
            message.error(this.props.auth.isEnglish?'Please upload a positive picture of your id card':'请上传身份证正面图片')
            return
        }else if(!this.state.url1){
            message.error(this.props.auth.isEnglish?'Please upload the negative picture of your id card':'请上传身份证反面图片')
            return
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //提交初级认证资料
                //console.log(147,this.state);
                axios.post(`${webLink}/primaryAuth`,
                    {
                        frontCard: this.state.url,
                        backCard: this.state.url1,
                        token:localStorage.getItem('token'),
                        address:this.state.address,
                        //code:this.state.code,
                        //email:this.state.email,
                        realName:this.state.realName,
                        ID:this.state.ID,
                        thirdParty:this.state.thirdParty,
                        employStatu:this.state.employStatu
                    })
                    .then(function (response) {
                        //console.log(response.data.code)

                        if(response.data.code===0){
                            message.error(that.props.auth.isEnglish?'Please complete your information':'请完善您的资料')
                        }else if(response.data.code===1){
                            message.success(that.props.auth.isEnglish?'Upload successful, please wait patiently':'上传成功，请耐心等待')
                            //console.log(741,this)
                            that.setState({
                                primaryCertified:1,
                                canChange:true
                            })
                            // axios.post('http://192.168.100.105:8000/addMessage', {
                            //     sender:localStorage.getItem('userName'),
                            //     receiver: 'admin',
                            //     type: 1,
                            //     token:localStorage.getItem('token')
                            // }).then(function (response) {
                            //     console.log(response)
                            // }).catch(function (error) {
                            //     console.log(error)
                            // })
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }else {
                message.error(this.props.auth.isEnglish?'Please improve the information':'请完善信息')
            }
        });
    }

    handleChange(value) {
        //console.log(`selected ${value}`);
        this.setState({
            thirdParty:value
        })
    }
    handleChange1(value) {
        //console.log(`selected ${value}`);
        this.setState({
            employStatu:value
        })
    }

    render() {

        const { getFieldDecorator,getFieldError, isFieldTouched ,getFieldValue} = this.props.form;

        const { intl: { formatMessage } } = this.props
        const basicVIPTip1 = formatMessage({id:'basicVIPTip1'});
        const basicVIPTip2 = formatMessage({id:'basicVIPTip2'});
        const basicVIPTip3 = formatMessage({id:'basicVIPTip3'});
        const basicVIPTip4 = formatMessage({id:'basicVIPTip4'});
        const basicVIPTip5 = formatMessage({id:'basicVIPTip5'});
        const basicVIPTip6 = formatMessage({id:'basicVIPTip6'});
        const basicVIPTip7 = formatMessage({id:'basicVIPTip7'});
        const basicVIPTip8 = formatMessage({id:'basicVIPTip8'});
        const basicVIPTip9 = formatMessage({id:'basicVIPTip9'});
        const basicVIPTip10 = formatMessage({id:'basicVIPTip10'});
        const basicVIPTip11 = formatMessage({id:'basicVIPTip11'});
        const basicVIPTip12 = formatMessage({id:'basicVIPTip12'});
        const basicVIPTip13 = formatMessage({id:'basicVIPTip13'});
        const basicVIPTip14 = formatMessage({id:'basicVIPTip14'});
        const basicVIPTip15 = formatMessage({id:'basicVIPTip15'});
        const basicVIPOption1 = formatMessage({id:'basicVIPOption1'});
        const basicVIPOption2 = formatMessage({id:'basicVIPOption2'});
        const basicVIPOption3 = formatMessage({id:'basicVIPOption3'});
        const basicVIPOption4 = formatMessage({id:'basicVIPOption4'});
        const basicVIPOption5 = formatMessage({id:'basicVIPOption5'});
        const yes = formatMessage({id:'yes'});
        const no = formatMessage({id:'no'});

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
            <Form onSubmit={this.handleSubmit}>
                {/*<FormattedDate*/}
                    {/*value={new Date('Tue Mar 20 2018 11:27:44 GMT+0800 (中国标准时间)')}*/}
                {/*/>*/}
                <div className={style.partreg}>
                    <div className={style.personal}>
                        <div className={style.perimport}>
                            {/*<div className={style.percontent} hidden={this.state.checkNick ? 'hidden' : ''}>*/}
                                {/*<FormItem>*/}
                                    {/*{(getFieldError('yanzhegnma')) ?*/}
                                        {/*<div className={style.errors}>请输入收到的短信验证码【必填】</div> :*/}
                                        {/*<div className={style.right}>请输入收到的短信验证码【必填】</div>}*/}
                                    {/*{getFieldDecorator('yanzhegnma', {*/}
                                        {/*rules: [{*/}
                                            {/*required: true, pattern: /^[0-9]*$/,message: ' '*/}
                                        {/*}]*/}
                                    {/*})(*/}
                                        {/*<Countdown*/}
                                            {/*beforeClick={() => {*/}
                                                {/*return true*/}
                                            {/*}}*/}
                                            {/*phone={localStorage.getItem('userName')}*/}
                                            {/*business='VERIFICATION'*/}
                                            {/*failCallback={() => {*/}
                                            {/*}}*/}
                                            {/*type="big"*/}
                                            {/*onChange={(e) => {*/}
                                                {/*this.setState({code: e.target.value})*/}
                                            {/*}}*/}
                                        {/*/>*/}
                                    {/*)}*/}


                                {/*</FormItem>*/}
                            {/*</div>*/}
                            {/*<div className={style.percontent}>*/}
                                {/*<FormItem>*/}
                                    {/*{(getFieldError('email')) ? <div onChange={() => {*/}
                                        {/*}} className={style.errors}>请输入正确格式邮箱【选填】</div> :*/}
                                        {/*<div className={style.right}>请输入正确格式邮箱【选填】</div>}*/}
                                    {/*{getFieldDecorator('email', {*/}
                                        {/*rules: [{*/}
                                            {/*required: this.state.checkNick,*/}
                                            {/*initialValue: '36363@ww.com',*/}
                                            {/*pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,*/}
                                            {/*message:' '*/}
                                        {/*}],*/}
                                    {/*})(*/}
                                        {/*<Input className={style.input} disabled={this.state.checkNick}*/}
                                               {/*placeholder="邮箱" onChange={(e) => {*/}
                                            {/*this.setState({email: e.target.value})*/}
                                        {/*}}/>*/}
                                    {/*)}*/}
                                {/*</FormItem>*/}
                            {/*</div>*/}
                            <div className={style.percontent}>
                                <FormItem
                                    hasFeedback
                                >{(getFieldError('idCard')) ? <div className={style.errors}>
                                        {basicVIPTip1}</div> :
                                    <div className={style.right}>
                                        {basicVIPTip1}</div>}
                                    {getFieldDecorator('idCard', {
                                        initialValue: this.state.ID,
                                        rules: [{
                                            required: true,
                                            whitespace: true,

                                            message: ' ',
                                            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
                                        }],
                                    })(<Input
                                        className={style.input} disabled={this.state.canChange} defaultValue={897987} placeholder={basicVIPTip12}
                                        onChange={(e) => {
                                            this.setState({ID: e.target.value})
                                        }}/>)}</FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem hasFeedback>
                                    {(getFieldError('userName')) ?
                                        <div className={style.errors}>{basicVIPTip2}
                                        </div> :
                                        <div className={style.right}>{basicVIPTip2} </div>}
                                    {getFieldDecorator('userName', {
                                        initialValue: this.state.realName,
                                        rules: [{
                                            required: true, pattern: /^([a-zA-Z\u4e00-\u9fa5\·]{1,10})$/,message: ' ',
                                        }]
                                    })(
                                        <Input
                                            className={style.input} disabled={this.state.canChange} placeholder={basicVIPTip13}
                                            onChange={(e) => {
                                                this.setState({realName: e.target.value})
                                            }}/>
                                    )}
                                </FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem>
                                    {(getFieldError('address')) ? <div className={style.errors}>{basicVIPTip3}</div> :
                                        <div className={style.right}>{basicVIPTip3}</div>}
                                    {getFieldDecorator('address', {
                                        initialValue: this.state.address,
                                        rules: [{
                                            required: this.state.checkNick,
                                            message: 'Please input your nickname',
                                        }],
                                    })(
                                        <Input
                                            className={style.input} disabled={this.state.canChange} placeholder={basicVIPTip14}
                                            onChange={(e) => {
                                                this.setState({address: e.target.value})
                                            }}/>
                                    )}
                                </FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem>
                                    {(getFieldError('job')) ? <div className={style.errors}>{basicVIPTip4}</div> :
                                        <div className={style.right}>{basicVIPTip4}</div>}
                                    {getFieldDecorator('job', {
                                        initialValue: this.state.employStatu,
                                        rules: [{
                                            required: true,
                                            message: ' ',
                                        }],
                                    })(
                                        <Select placeholder="请选择" size={'large'} disabled={this.state.canChange}
                                                style={{width: '100%', height: 40, lineHeight: 40}}
                                                onChange={this.handleChange1.bind(this)}>
                                            <Option value={1}>{basicVIPOption1}</Option>
                                            <Option value={2}>{basicVIPOption2}</Option>
                                            <Option value={3}>{basicVIPOption3}</Option>
                                            <Option value={4}>{basicVIPOption4}</Option>
                                            <Option value={5}>{basicVIPOption5}</Option>

                                        </Select>
                                    )}
                                </FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem>
                                    {(getFieldError('elvan')) ? <div className={style.errors}>{basicVIPTip5}</div> :
                                        <div className={style.right}>{basicVIPTip5}</div>}
                                    {getFieldDecorator('elvan', {
                                        initialValue: this.state.thirdParty,
                                        rules: [{
                                            required: true,
                                            message: ' ',
                                        }],
                                    })(
                                        <Select placeholder="请选择" size={'large'} disabled={this.state.canChange}
                                                style={{width: '100%', height: 40, lineHeight: 40}}
                                                onChange={this.handleChange.bind(this)}>
                                            <Option value={1}>{yes}</Option>
                                            <Option value={2}>{no}</Option>

                                        </Select>
                                    )}
                                </FormItem>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={style.idbox}>
                    <span className={style.id}>{basicVIPTip6}</span>
                    <div className={style.lupingbox}>
                        <div className={style.boxs} style={this.state.canChange?{'display':'block'}:{'display':'none'}}></div>
                        <QQiniu onDrop={this.onDrop1.bind(this)} className={style.qiniu} token={this.state.token}  onUpload={this.onUpload}>
                            <div style={this.state.url?{'display':'none'}:{'display':'block'}} className={style.tipword}>{basicVIPTip10}</div>
                            <img style={this.state.url1?{'display':'block'}:{'display':'none'}} className={style.egimg} src={this.state.isLink11?this.state.url11:this.state.url} alt="图片加载中"/>
                        </QQiniu>
                    </div>
                    <div className={style.rupingbox}>
                        <div className={style.boxs} style={this.state.canChange?{'display':'block'}:{'display':'none'}}></div>
                        <QQiniu onDrop={this.onDrop2.bind(this)} className={style.qiniu} token={this.state.token}  onUpload={this.onUpload}>

                            <div style={this.state.url1?{'display':'none'}:{'display':'block'}} className={style.tipword}>{basicVIPTip11}</div>
                            <img style={this.state.url1?{'display':'block'}:{'display':'none'}} className={style.egimg} src={this.state.isLink22?this.state.url22:this.state.url1} alt={basicVIPTip15}/>
                        </QQiniu>
                    </div>
                    <div className={style.uprequire}>
                        <p>
                            {basicVIPTip7}<br/>
                            {basicVIPTip8}<br/>
                            {basicVIPTip9}
                        </p>
                    </div>
                </div>
                <div className={style.prfooter}>
                    <FormItem>
                        <Button type="primary" htmlType="submit" disabled={this.state.canChange} style={{
                            width: 160,
                            height: 40,
                            marginTop: 40,
                            margin: '0 auto',
                            fontSize: 18,
                            display: 'block',
                        }}>{this.reword()}</Button>
                    </FormItem>
                </div>

            </Form>

        )
    }
}

function mapStateToProps(state, props) {
    return {
        auth:state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

UserData = connect(mapStateToProps, mapDispatchToProps)(UserData)

const WrapUserData = Form.create()(UserData);
export default injectIntl(WrapUserData);


