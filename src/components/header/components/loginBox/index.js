import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { Modal,Input,Select,Form,Button,message } from 'antd';
import {bindActionCreators} from 'redux'
import {hideAuth,showRegister,showResetPwd} from '../../../../actions/auth'
import {login,resetPwd} from '../../../../actions/user'
import {getCaption} from '../../../../actions/unit'
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';
import axios from  '../../../../common/axiosConf'
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';

const confirm = Modal.info;
const FormItem = Form.Item;
const Option = Select.Option;

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            areaCode: ["86"],
            picCode: '',
            picImg: '',
            phone: '',
            pwd: '',
        }
    }
    componentDidMount(){
        var that=this;
        this.props.getCaption({},(img) => {
            //console.log('huhu'+img)
            that.setState({
                picImg:that.getPicImg(img)
            })
        });
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

    hideModal = () => {
        this.props.hideAuth()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(err)
            if (!err) {
                //Toast.loading('', 0, null, false)
                this.props.login({
                    email: this.state.email,
                    pwd: this.state.pwd,
                    code: this.state.picCode,
                    language:this.props.auth.isEnglish
                }, (errorText) => {
                    Toast.hide()
                    this.setState({picImg: this.getPicImg()})
                    //console.log('lwlwlwl',errorText)
                    if (errorText) {
                        Toast.info(errorText, 3, null, false)
                    } else {
                        this.props.hideAuth()
                    }
                })
            }else {
                message.error(this.props.auth.isEnglish?"Incomplete filling":"填写不完善")
            }
        });
    }

    render() {
        const { getFieldDecorator} = this.props.form;
        const { intl: { formatMessage } } = this.props
        const loginBoxTitle = formatMessage({id:'loginBoxTitle'});
        const importLEmail = formatMessage({id:'importLEmail'});
        const importRLEmail = formatMessage({id:'importRLEmail'});
        const importLCode = formatMessage({id:'importLCode'});
        const importRLCode = formatMessage({id:'importRLCode'});
        const importLPwd = formatMessage({id:'importLPwd'});
        const importRLPwd = formatMessage({id:'importRLPwd'});
        const loginNow = formatMessage({id:'loginNow'});
        const forget = formatMessage({id:'forget'});
        const register = formatMessage({id:'register'});
        const noAccount = formatMessage({id:'noAccount'});

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
                            <FormattedMessage id='loginBoxTitle' defaultMessage='请登录'/>
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

                                {/*手机登录*/}
                                {/*<div className={style.qh}>*/}
                                    {/*<Select  value={this.state.areaCode} size={'large'} style={{ width: 80,height:40,lineHeight:40,}} onChange={(value)=>{this.setState({areaCode:value})}} dropdownStyle={{width:'520'}}>*/}
                                        {/*<Option value="86">+86</Option>*/}
                                        {/*<Option value="87">+87</Option>*/}
                                        {/*<Option value="88">+88</Option>*/}
                                    {/*</Select>*/}
                                {/*</div>*/}
                                {/*<div className={style.phone}>*/}
                                    {/*<FormItem>{getFieldDecorator('phone', {*/}
                                    {/*rules: [{*/}
                                        {/*required: true, message: '请输入正确格式的手机号码!',pattern:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/}],*/}
                                {/*})(<div>*/}
                                    {/*<Input onChange={(e)=>{this.setState({phone:e.target.value})}} className={style.inputp} placeholder="手机号"/></div>*/}
                                {/*)}*/}
                                {/*</FormItem>*/}
                                {/*</div>*/}
                            </div>
                            <div className={style.tuxing}>
                                <div className={style.tx} onClick={this.regetPicImg.bind(this)}>
                                    {this.state.picImg}
                                </div>
                                <FormItem>{getFieldDecorator('authCode', {
                                    rules: [{ required: true, message: importRLCode}],
                                })(<div>
                                    <Input onChange={(e)=>{this.setState({picCode:e.target.value})}} className={style.inputp} placeholder={importLCode}/></div>
                                )}
                                </FormItem>
                            </div>
                            <div className={style.tuxing}>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                    rules: [{ required: true, message: importRLPwd,pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/ }],
                                })(<div>
                                    <Input type={'password'} onChange={(e)=>{this.setState({pwd:e.target.value})}} className={style.inputp} placeholder={importLPwd}/></div>
                                )}
                                </FormItem>

                            </div>

                            <FormItem>
                                <Button type="primary" htmlType="submit" style={{width:'100%',height:40,marginTop:40}}><FormattedMessage id='loginNow' defaultMessage='马上登录'/></Button>
                            </FormItem>
                            <div className={style.toggletab}>
                                <div onClick={()=>{this.props.showResetPwd()}} className={style.forpass}><FormattedMessage id='forget' defaultMessage='忘记密码'/>?</div>
                                <a onClick={this.props.showRegister} className={style.reg} href="javascript:void (0)">
                                    <FormattedMessage id='register' defaultMessage='注册账号'/>
                                </a>
                                <span className={style.noacc}>
                                   <FormattedMessage id='noAccount' defaultMessage='没有账户'/>、
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
        hideAuth:bindActionCreators(hideAuth,dispatch),
        login: bindActionCreators(login, dispatch),
        resetPwd: bindActionCreators(resetPwd, dispatch),
        showResetPwd: bindActionCreators(showResetPwd, dispatch),
        showRegister: bindActionCreators(showRegister, dispatch),
        getCaption: bindActionCreators(getCaption, dispatch)
    }
}

LoginBox = connect(mapStateToProps, mapDispatchToProps)(LoginBox)
const WrappedLoginBox = Form.create()(LoginBox)

export default injectIntl(WrappedLoginBox);