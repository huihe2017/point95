import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { Modal,Input,Select,Form,Button } from 'antd';
import {bindActionCreators} from 'redux'
import {hideAuth,showRegister,showResetPwd} from '../../../../actions/auth'
import {login,resetPwd} from '../../../../actions/user'
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';

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
            picImg: this.getPicImg(),
            phone: '',
            pwd: '',
        }
    }
    getPicImg() {
        return <img onClick={(e) => {
            e.target.src = 'http://47.91.236.245:4030/user/image-captcha?tm=' + Math.random()
        }}
                    className={style.authCode}
                    src={"http://47.91.236.245:4030/user/image-captcha?tm=" + Math.random()}/>
    }

    hideModal = () => {
        this.props.hideAuth()
    }
    handleSubmit = (e) => {
        // Toast({
        //     type: "success",
        //     msg: '账号或密码错误',
        //     duration: 2000
        // })
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Toast.loading('', 0, null, false)
                this.props.login({
                    phone: this.state.areaCode + " " + this.state.phone,
                    pwd: this.state.pwd,
                    picCode: this.state.picCode
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




    render() {
        const { getFieldDecorator} = this.props.form;

        return (
            <div className={style.wrap}>
                <Modal
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                    width="520"
                >
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                        <span className={style.llctitle}>
                            欢迎来到海豚汇，请登录
                        </span>
                        <div className={style.perselphone}>
                            <div className={style.selphone}>
                                <div className={style.qh}>
                                    <Select  value={this.state.areaCode} size={'large'} style={{ width: 80,height:40,lineHeight:40,}} onChange={(value)=>{this.setState({areaCode:value})}} dropdownStyle={{width:'520'}}>
                                        <Option value="86">+86</Option>
                                        <Option value="87">+87</Option>
                                        <Option value="88">+88</Option>
                                    </Select>
                                </div>
                                <div className={style.phone}>
                                    <FormItem>{getFieldDecorator('phone', {
                                    rules: [{
                                        required: true, message: '请输入正确格式的手机号码!',pattern:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/}],
                                })(<div>
                                    <Input onChange={(e)=>{this.setState({phone:e.target.value})}} className={style.inputp} placeholder="手机号"/></div>
                                )}
                                </FormItem>
                                </div>
                            </div>
                            <div className={style.tuxing}>
                                {this.state.picImg}
                                <FormItem>{getFieldDecorator('authCode', {
                                    rules: [{ required: true, message: '请输入正确格式的验证码!' }],
                                })(<div>
                                    <Input onChange={(e)=>{this.setState({picCode:e.target.value})}} className={style.inputp} placeholder="请输入图形验证码"/></div>
                                )}
                                </FormItem>
                            </div>
                            <div className={style.tuxing}>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入正确格式的密码!',pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/ }],
                                })(<div>
                                    <Input type={'password'} onChange={(e)=>{this.setState({pwd:e.target.value})}} className={style.inputp} placeholder="密码6-24位字母、数字、字符"/></div>
                                )}
                                </FormItem>

                            </div>

                            <FormItem>
                                <Button type="primary" htmlType="submit" style={{width:'100%',height:40,marginTop:40}}>马上登录</Button>
                            </FormItem>
                            <div className={style.toggletab}>
                                <div onClick={()=>{this.props.showResetPwd()}} className={style.forpass}>忘记密码</div>
                                <a onClick={this.props.showRegister} className={style.reg} href="javascript:void (0)">
                                    注册账号
                                </a>
                                <span className={style.noacc}>
                                    没有账户、
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
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        hideAuth:bindActionCreators(hideAuth,dispatch),
        login: bindActionCreators(login, dispatch),
        resetPwd: bindActionCreators(resetPwd, dispatch),
        showResetPwd: bindActionCreators(showResetPwd, dispatch),
        showRegister: bindActionCreators(showRegister, dispatch)
    }
}

LoginBox = connect(mapStateToProps, mapDispatchToProps)(LoginBox)
const WrappedLoginBox = Form.create()(LoginBox)

export default WrappedLoginBox;