import React from 'react';
import { Form,Radio,Input,DatePicker,Button,Icon,Select,Upload, message,Checkbox   } from 'antd';
import style from './index.css';
import UploadImg from '../../../../components/uploadImg'
import QQiniu from 'react-qiniu';
import qiniu from "qiniu";
import axios from  '../../../../common/axiosConf'
import Countdown from '../../../../components/countdown/index'
import Toast from 'antd-mobile/lib/toast';
import moment from "moment/moment";
import 'moment/locale/zh-cn';
moment.locale('en');

const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';

class AdvanVip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            ischange:true,
            url:'',
            dis:false,
            token: '',
            url11:'',
            canChange:false,


        }
    }

    componentWillMount(){
        var that=this;
        console.log(moment(this.state.passportTime,dateFormat)._d=='Invalid Date')
        //获取高级认证的资料
        axios.get('http://192.168.100.105:8000/seniorAuthMsg', {params:{
            token:localStorage.getItem('token')
        }}).then(function (response) {
            if (response.data.code === 0) {
                message.error(response.data.message);
            }
            that.setState({
                seniorCertified:response.data.result["0"].seniorCertified
            })

            if(response.data.result["0"].seniorCertified==2){
                that.setState({
                    url:'',
                    netYearIncome:'',
                    passportNo:'',
                    yearIncome:'',
                    fundsSource:null,
                    passportTime:null,
                    primaryCertified:response.data.result["0"].primaryCertified
                })
            }else {
                console.log(response.data.result)
                that.setState({
                    url:response.data.result["0"].passport,
                    canChange:true,
                    netYearIncome:response.data.result["0"].netYearIncome,
                    passportNo:response.data.result["0"].passportNo,
                    yearIncome:response.data.result["0"].yearIncome,
                    fundsSource:response.data.result["0"].fundsSource,
                    passportTime:response.data.result["0"].passportTime,
                    primaryCertified:response.data.result["0"].primaryCertified
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
    onread(e){
        console.log(`checked = ${e.target.checked}`);
    }
    dataChange(date){
        console.log(date);
        this.setState({
            passportTime:date?date._d:''
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

    reword(){
        if(this.state.seniorCertified==1){
            return 'In review';

        }else if(this.state.seniorCertified==2){
            return 'Submit'

        }else if(this.state.seniorCertified==3){
            return 'Verified'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var that=this

        if(this.state.primaryCertified!==3){
            message.error('Please pass the preliminary examination first!')
            return
        }
        if(!this.state.url){
            message.error('Please upload pictures!')
            return
        }
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                //提交初级认证资料
                // console.log(this.state);
                axios.post('http://192.168.100.105:8000/seniorAuth',
                    {
                        passport: this.state.url,
                        token:localStorage.getItem('token'),
                        code:this.state.code,
                        netYearIncome:this.state.netYearIncome,
                        passportNo:this.state.passportNo,
                        yearIncome:this.state.yearIncome,
                        fundsSource:this.state.fundsSource,
                        passportTime:this.state.passportTime
                    })
                    .then(function (response) {
                        //console.log(response.data.code)
                        if(response.data.code===0){
                            message.error(response.data.message)
                        }else if(response.data.code===1){
                            message.success('Upload success, please be patient...')
                            that.setState({
                                seniorCertified:1,
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
                message.error('Please improve the information!')
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
            fundsSource:value
        })
    }

    render() {

        const { getFieldDecorator,getFieldError, isFieldTouched ,getFieldValue} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please choose your birthday!' }],
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

                            <div className={style.percontent}>
                                <FormItem
                                    hasFeedback
                                >{(getFieldError('idCard')) ? <div className={style.errors}>
                                        Please fill in your passport number【required】</div> :
                                    <div className={style.right}>
                                        Please fill in your passport number【required】</div>}
                                    {getFieldDecorator('idCard', {
                                        initialValue: this.state.passportNo,
                                        rules: [{
                                            required: true,
                                            whitespace: true,
                                            initialValue: '36363@ww.com',message: ' ',
                                            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                                        }],
                                    })(<Input
                                        className={style.input} disabled={this.state.canChange} placeholder="Passport Number"
                                        onChange={(e) => {
                                            this.setState({passportNo: e.target.value})
                                        }}/>)}</FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem>
                                    {(getFieldError('linedate')) ? <div className={style.errors}>Expiration date【required】</div> :
                                        <div className={style.right}>Expiration date【required】</div>}
                                    {getFieldDecorator('linedate', {
                                        initialValue:moment(this.state.passportTime,dateFormat)._d=='Invalid Date'?null:moment(this.state.passportTime,dateFormat),
                                        rules: [{
                                            required: true,
                                            message: ' ',
                                        }],
                                    })(
                                        <DatePicker
                                            onChange={this.dataChange.bind(this)}
                                            disabled={this.state.canChange}/>
                                    )}
                                </FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem
                                    hasFeedback
                                >{(getFieldError('yearIncome')) ? <div className={style.errors}>
                                        Expected annual income【optional】</div> :
                                    <div className={style.right}>
                                        Expected annual income【optional】</div>}
                                    {getFieldDecorator('yeargold', {
                                        initialValue: this.state.yearIncome,
                                        rules: [{
                                            required: false,


                                            initialValue: '36363@ww.com',message: ' ',
                                            pattern: /^[0-9].*$/
                                        }],
                                    })(<Input
                                        className={style.input} disabled={this.state.canChange} placeholder="Annual Income"
                                        suffix={<span>￥</span>}
                                        onChange={(e) => {
                                            this.setState({yearIncome: e.target.value})
                                        }}/>)}</FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem
                                    hasFeedback
                                >{(getFieldError('cleardate')) ? <div className={style.errors}>
                                        Net Worth(Excluding non-current assets such as houses and vehicles.)【optional】</div> :
                                    <div className={style.right}>
                                        Net Worth(Excluding non-current assets such as houses and vehicles.)【optional】</div>}
                                    {getFieldDecorator('cleardate', {
                                        initialValue: this.state.netYearIncome,
                                        rules: [{
                                            required: false,
                                            initialValue: '36363@ww.com',message: ' ',
                                            pattern: /^[0-9].*$/
                                        }],
                                    })(<Input
                                        className={style.input} disabled={this.state.canChange} placeholder="Net Worth"
                                        suffix={<p>￥</p>}
                                        onChange={(e) => {
                                            this.setState({netYearIncome: e.target.value})
                                        }}/>)}</FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem>
                                    {(getFieldError('job')) ? <div className={style.errors}>Capital Source【required】</div> :
                                        <div className={style.right}>Capital Source【required】</div>}
                                    {getFieldDecorator('job', {
                                        initialValue: this.state.fundsSource,
                                        rules: [{
                                            required: true,
                                            message: ' ',
                                        }],
                                    })(
                                        <Select placeholder="Please Choose" size={'large'} disabled={this.state.canChange}
                                                style={{width: '100%', height: 40, lineHeight: 40}}
                                                onChange={this.handleChange1.bind(this)}>
                                            <Option value={1}>Income</Option>
                                            <Option value={2}>Investment Proceeds</Option>
                                            <Option value={3}>IRA/Retirement Saving</Option>
                                            <Option value={4}>
                                                Other
                                                {/*{this.state.employStatu==4? <Input style={{ width: 100, marginLeft: 10 }} />:null}*/}
                                                </Option>


                                        </Select>
                                    )}
                                </FormItem>
                            </div>
                            {/*<div className={style.percontent}>*/}
                                {/*<FormItem>*/}
                                    {/*{(getFieldError('ability')) ? <div className={style.errors}>投资风险承担能力【必填】</div> :*/}
                                        {/*<div className={style.right}>投资风险承担能力【必填】</div>}*/}
                                    {/*{getFieldDecorator('ability', {*/}
                                        {/*rules: [{*/}
                                            {/*required: true,*/}
                                            {/*message: ' ',*/}
                                        {/*}],*/}
                                    {/*})(*/}
                                        {/*<Select placeholder="请选择" size={'large'} disabled={this.state.checkNick}*/}
                                                {/*style={{width: '100%', height: 40, lineHeight: 40}}*/}
                                                {/*onChange={this.handleChange1.bind(this)}>*/}
                                            {/*<Option value={1}>是</Option>*/}
                                            {/*<Option value={2}>否</Option>*/}
                                        {/*</Select>*/}
                                    {/*)}*/}
                                {/*</FormItem>*/}
                            {/*</div>*/}
                            {/*<div className={style.percontent}>*/}
                                {/*<FormItem>*/}
                                    {/*{getFieldDecorator('read', {*/}
                                        {/*rules: [{*/}
                                            {/*required: true,*/}
                                            {/*message: ' ',*/}
                                        {/*}],*/}
                                    {/*})(*/}
                                        {/*<Checkbox onChange={this.onread.bind(this)}>我了解与Point95 Global交易的最小交易规模为75,000美元。</Checkbox>*/}
                                    {/*)}*/}
                                {/*</FormItem>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <div className={style.idbox}>
                    <span className={style.id}>Upload passport photos</span>
                    <div className={style.lupingbox}>
                        <div className={style.boxs} style={this.state.canChange?{'display':'block'}:{'display':'none'}}></div>
                        <QQiniu onDrop={this.onDrop1.bind(this)} className={style.qiniu} token={this.state.token}  onUpload={this.onUpload}>
                            <div style={this.state.url?{'display':'none'}:{'display':'block'}}  className={style.tipword}>Click to upload your passport photo</div>
                            <img style={this.state.url?{'display':'block'}:{'display':'none'}} className={style.egimg} src={this.state.isLink11?this.state.url11:this.state.url} alt="Loading"/>
                        </QQiniu>
                    </div>

                    <div className={style.uprequire}>
                        <p>
                            1.Files are digital photos,Please do not beautify and modify them so as not to fail. <br/>
                            2.Upload file format which support png, jpg and bmp.<br/>
                            3.The file size is no more than 3MB，the minimum file size is 200px*150px.

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

const WrapAdvanVip = Form.create()(AdvanVip);
export default WrapAdvanVip;


