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
moment.locale('zh-cn');

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
            passportTime:moment('Thu Jan 01 1970 10:50:40 GMT+0800 (中国标准时间)', dateFormat),

        }
    }

    componentWillMount(){
        var that=this;

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
                    fundsSource:'',
                    passportTime:'1970.1.1',
                })
            }else {
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

        console.log('http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex);
        this.setState({
            url:'http://p543qsy5q.bkt.clouddn.com/'+ll.slice(27,63)+ex+'?imageView2/2/w/308/h/210/interlace/1/q/100',
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
            return '审核中';

        }else if(this.state.seniorCertified==2){
            return '提交'

        }else if(this.state.seniorCertified==3){
            return '审核通过'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var that=this
        if(!this.state.url){
            message.error('请上传图片')
            return
        }
        if(!this.state.primaryCertified==3){
            message.error('请先通过初级审核')
            return
        }
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                //提交初级认证资料
                console.log(this.state);
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
                            message.success('上传成功，请耐心等待')
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
                                        请填写护照号码【必填】</div> :
                                    <div className={style.right}>
                                        请填写护照号码【必填】</div>}
                                    {getFieldDecorator('idCard', {
                                        initialValue: this.state.passportNo,
                                        rules: [{
                                            required: true,
                                            whitespace: true,
                                            initialValue: '36363@ww.com',message: ' ',
                                            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                                        }],
                                    })(<Input
                                        className={style.input} disabled={this.state.canChange} placeholder="护照号码"
                                        onChange={(e) => {
                                            this.setState({passportNo: e.target.value})
                                        }}/>)}</FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem>
                                    {(getFieldError('linedate')) ? <div className={style.errors}>护照到期日期【必填】</div> :
                                        <div className={style.right}>护照到期日期【必填】</div>}
                                    {getFieldDecorator('linedate', {
                                        initialValue: moment(this.state.passportTime, dateFormat),
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
                                        预期年收入【选填】</div> :
                                    <div className={style.right}>
                                        预期年收入【选填】</div>}
                                    {getFieldDecorator('yeargold', {
                                        initialValue: this.state.yearIncome,
                                        rules: [{
                                            required: false,


                                            initialValue: '36363@ww.com',message: ' ',
                                            pattern: /^[0-9].*$/
                                        }],
                                    })(<Input
                                        className={style.input} disabled={this.state.canChange} placeholder="预期年收入"
                                        suffix={<span>￥</span>}
                                        onChange={(e) => {
                                            this.setState({yearIncome: e.target.value})
                                        }}/>)}</FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem
                                    hasFeedback
                                >{(getFieldError('cleardate')) ? <div className={style.errors}>
                                        净值（排除房屋、车辆等非流动资产）【选填】</div> :
                                    <div className={style.right}>
                                        净值（排除房屋、车辆等非流动资产）【选填】</div>}
                                    {getFieldDecorator('cleardate', {
                                        initialValue: this.state.netYearIncome,
                                        rules: [{
                                            required: false,
                                            initialValue: '36363@ww.com',message: ' ',
                                            pattern: /^[0-9].*$/
                                        }],
                                    })(<Input
                                        className={style.input} disabled={this.state.canChange} placeholder="净值"
                                        suffix={<p>￥</p>}
                                        onChange={(e) => {
                                            this.setState({netYearIncome: e.target.value})
                                        }}/>)}</FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem>
                                    {(getFieldError('job')) ? <div className={style.errors}>资金来源【必填】</div> :
                                        <div className={style.right}>资金来源【必填】</div>}
                                    {getFieldDecorator('job', {
                                        initialValue: this.state.fundsSource,
                                        rules: [{
                                            required: true,
                                            message: ' ',
                                        }],
                                    })(
                                        <Select placeholder="请选择" size={'large'} disabled={this.state.canChange}
                                                style={{width: '100%', height: 40, lineHeight: 40}}
                                                onChange={this.handleChange1.bind(this)}>
                                            <Option value={1}>收入</Option>
                                            <Option value={2}>投资收益</Option>
                                            <Option value={3}>退休金/退休积蓄</Option>
                                            <Option value={4}>
                                                其它
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
                    <span className={style.id}>上传护照照片</span>
                    <div className={style.lupingbox}>
                        <div className={style.boxs} style={this.state.canChange?{'display':'block'}:{'display':'none'}}></div>
                        <QQiniu onDrop={this.onDrop1.bind(this)} className={style.qiniu} token={this.state.token}  onUpload={this.onUpload}>
                            <div className={style.tipword}>点击上传上传护照照片</div>
                            <img className={style.egimg} src={this.state.isLink11?this.state.url11:this.state.url} alt=""/>
                        </QQiniu>
                    </div>

                    <div className={style.uprequire}>
                        <p>
                            1.文件为数码照片，请勿进行美化和修改，以免申请失败 <br/>
                            2.上传文件格式支持png，jpg和bmp <br/>
                            3.文件大小不超过3MB，文件尺寸最小为200px*150px

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


