import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {Modal, Input, Select, Form, AutoComplete, Button, Row, Col,message} from 'antd';
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {hideAuth, showLogin} from '../../../../actions/auth'
import {getCaption} from '../../../../actions/unit'
import {register} from '../../../../actions/user'
import Countdown from '../../../countdown/index'
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';
import axios from  '../../../../common/axiosConf'
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';

const confirm = Modal.info;
const FormItem = Form.Item;
const Option = Select.Option;


function handleChange(value) {
    console.log(`selected ${value}`);
}

class RegisterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            picImg: '',
            areaCode: ["86"],
            phone: '',
            email:''
        }
    }

    componentDidMount(){
        var that=this
        this.props.getCaption({},(img) => {
            //console.log('huhu'+img)
            that.setState({
                picImg:that.getPicImg(img)
            })
        });
    }



    hideModal = () => {
        this.props.hideAuth()
        // this.setState({
        //     visible: false,
        // });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(this.state.email)
            if (!err) {
                //Toast.loading('', 0, null, false)
                this.props.register({
                    // tel: this.state.areaCode + " " + this.state.phone,
                    pwd: this.state.password,
                    code: this.state.authCode,
                    email: this.state.email,
                    language:this.props.auth.isEnglish
                }, (errorText) => {
                    Toast.hide()
                    this.setState({picImg: this.getPicImg()})
                    if (errorText) {
                        Toast.info(errorText, 3, null, false)
                    } else {
                        this.props.hideAuth()
                    }
                })
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    checkPassword = (a,rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback(a);
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    checkPhone = (getFieldError, getFieldValue) => {
        let flag = false
        this.props.form.validateFields(['phone', 'authCode'], (err) => {
            if (!err) {
                flag = true
            }
        });

        return flag
    }

    getPicImg(e) {
        return <div dangerouslySetInnerHTML={{__html:e}}/>
    }

    regetPicImg(){
        var that=this
        this.props.getCaption({},(img) => {
            //console.log('huhu'+img)
            that.setState({
                picImg:that.getPicImg(img)
            })
        });
    }


    render() {
        const {getFieldDecorator, getFieldError, getFieldValue} = this.props.form;

        const { intl: { formatMessage } } = this.props
        const regBoxTitle = formatMessage({id:'regBoxTitle'});
        const importLEmail = formatMessage({id:'importLEmail'});
        const importRLEmail = formatMessage({id:'importRLEmail'});
        const importLCode = formatMessage({id:'importLCode'});
        const importRLCode = formatMessage({id:'importRLCode'});
        const importLPwd = formatMessage({id:'importLPwd'});
        const importRLPwd = formatMessage({id:'importRLPwd'});
        const importRTPwd = formatMessage({id:'importRTPwd'});
        const importRRTPwd = formatMessage({id:'importRRTPwd'});
        const login = formatMessage({id:'login'});
        const importCLPwd = formatMessage({id:'importCLPwd'});
        const yesAccount = formatMessage({id:'yesAccount'});
        const regComplete = formatMessage({id:'regComplete'});

        return (
            <div className={style.wrap}>
                <Modal
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    width="520"
                >

                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                        <span className={style.llctitle}>
                            <FormattedMessage id='regBoxTitle' defaultMessage='注册账号'/>
                        </span>
                            <div className={style.perselphone}>
                                <div className={style.selphone}>
                                    {/*邮箱登陆*/}
                                    <FormItem>
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                required: true,
                                                initialValue: '36363@ww.com',
                                                pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
                                                message:importRLEmail
                                            }],
                                        })(
                                            <Input className={style.inputp} disabled={this.state.checkNick}
                                                   placeholder={importLEmail} onChange={(e) => {
                                                       this.setState({email: e.target.value})
                                            }}/>
                                        )}
                                    </FormItem>

                                    {/*<div className={style.qh}>*/}
                                        {/*<Select value={this.state.areaCode} size={'large'}*/}
                                                {/*style={{width: 80, height: 40, lineHeight: 40,}} onChange={(value) => {*/}
                                            {/*this.setState({areaCode: value})*/}
                                        {/*}} dropdownStyle={{width: '520'}}>*/}
                                            {/*<Option value="86">+86</Option>*/}
                                            {/*<Option value="87">+87</Option>*/}
                                            {/*<Option value="88">+88</Option>*/}
                                        {/*</Select>*/}
                                    {/*</div>*/}
                                    {/*<div className={style.phone}>*/}
                                        {/*<FormItem>{getFieldDecorator('phone', {*/}
                                            {/*rules: [{*/}
                                                {/*required: true,*/}
                                                {/*message: '请输入正确格式的手机号码!',*/}
                                                {/*pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/*/}
                                            {/*}],*/}
                                        {/*})(<div>*/}
                                            {/*<Input onChange={*/}
                                                {/*(e) => {*/}
                                                    {/*this.setState({phone: e.target.value})*/}
                                                {/*}*/}
                                            {/*}*/}
                                                   {/*className={style.inputp}*/}
                                                   {/*placeholder="手机号"/></div>*/}
                                        {/*)}*/}
                                        {/*</FormItem>*/}
                                    {/*</div>*/}
                                </div>
                                <div className={style.tuxing}>
                                    {/*<img className={style.authCode}*/}
                                    {/*src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508392689327&di=de9f7dd0fb15a19b677b80a6e88956f2&imgtype=0&src=http%3A%2F%2Fimages2015.cnblogs.com%2Fblog%2F875028%2F201605%2F875028-20160513234811280-1452474757.png"*/}
                                    {/*alt=""/>*/}
                                    <div className={style.tx} onClick={this.regetPicImg.bind(this)}>
                                        {this.state.picImg}
                                    </div>


                                    <FormItem >{getFieldDecorator('authCode', {
                                        rules: [{required: true, message: importRLCode}],
                                    })(<div>
                                        <Input onChange={
                                            (e) => {
                                                this.setState({authCode: e.target.value})
                                            }
                                        }
                                               className={style.inputp}
                                               placeholder={importLCode}/></div>
                                    )}
                                    </FormItem>
                                </div>
                                {/*<div className={style.tuxing}>*/}
                                    {/*<FormItem>{getFieldDecorator('code', {rules: [{required: true, message: '请输入短信验证码!'*/}
                                        {/*}],})(<div>*/}
                                            {/*<Countdown*/}
                                                {/*beforeClick={() => {return this.checkPhone(getFieldError, getFieldValue)}} phone={this.state.phone} picCode={this.state.authCode} business='REGISTER' failCallback={() => {this.setState({picImg: this.regetPicImg()})}} type="small" onChange={(e) => {this.setState({code: e.target.value})}}/>*/}
                                        {/*</div>)}*/}
                                    {/*</FormItem>*/}
                                {/*</div>*/}
                                <div className={style.tuxing}>
                                    <FormItem>{getFieldDecorator('password', {
                                        rules: [{
                                            required: true,
                                            message: importRLPwd,
                                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/
                                        }],
                                    })(<div>
                                        <Input onChange={
                                            (e) => {
                                                this.setState({password: e.target.value})
                                            }} className={style.inputp} placeholder={importLPwd}
                                               type={'password'}/></div>
                                    )}
                                    </FormItem>
                                </div>
                                <div className={style.tuxing}>
                                    <FormItem
                                        hasFeedback
                                    >
                                        {getFieldDecorator('confirm', {
                                            rules: [{
                                                required: true, message: importCLPwd,
                                            }, {
                                                validator: this.checkPassword.bind(this,importRRTPwd),
                                            }],
                                        })(
                                            <Input
                                                type="password"
                                                className={style.inputp}
                                                onChange={
                                                    (e) => {
                                                        this.setState({confirm: e.target.value})
                                                    }
                                                }
                                                onBlur={this.handleConfirmBlur}
                                                placeholder={importRTPwd}/>
                                        )}
                                    </FormItem>
                                </div>
                                <FormItem>
                                    <Button type="primary" htmlType="submit"
                                            style={{width: '100%', height: 40, marginTop: 20}}>{regComplete}</Button>
                                </FormItem>

                                <div className={style.toggletab}>
                                    <a onClick={() => {
                                        this.props.showLogin()
                                    }} className={style.reg} href="javascript:void (0)">{login}</a>
                                    <span className={style.noacc}>
                                        {yesAccount}、
                                </span>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Modal>
            </div>
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
        hideAuth: bindActionCreators(hideAuth, dispatch),
        register: bindActionCreators(register, dispatch),
        showLogin: bindActionCreators(showLogin, dispatch),
        getCaption: bindActionCreators(getCaption, dispatch)
    }
}

RegisterBox = connect(mapStateToProps, mapDispatchToProps)(RegisterBox)
const WrappedRegisterBox = Form.create()(RegisterBox)

export default injectIntl(WrappedRegisterBox);


