import React from 'react';
import style from "./index.css"
import Title from '../../components/title'
import ContentList from '../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import Header from '../../components/header'
import Footer from '../../components/footer'
import 'antd-mobile/lib/toast/style/css';
import axios from  '../../common/axiosConf'
import {hideAuth, showLogin} from '../../actions/auth'
import {resetPwd} from '../../actions/user'
import {bindActionCreators} from 'redux'
import Toast from 'antd-mobile/lib/toast';
import Crumb from '../../components/crumbs'

import {Modal, Input, Select, Form, AutoComplete, Button, Row, Col} from 'antd';

const confirm = Modal.info;
const FormItem = Form.Item;
const Option = Select.Option;

class ImportPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            picImg: '',
            areaCode: ["86"],
            phone: ''
        }
    }

    componentDidMount(){
        var that=this;
        axios.get('http://192.168.100.105:8000/captcha')
            .then(function(response){
                that.setState({
                    picImg:that.getPicImg(response.data.result.txt)
                })
            })
            .catch(function(err){
                console.log(11,err);
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
            if (!err) {
                Toast.loading('', 0, null, false)
                this.props.resetPwd({
                    tel: this.state.phone,
                    pwd: this.state.password,
                    code: this.state.code
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
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不同!');
        } else {
            callback();
        }
    }


    getPicImg(e) {
        return <div dangerouslySetInnerHTML={{__html:e}}/>
    }

    regetPicImg(){
        var that=this
        axios.get('http://192.168.100.105:8000/captcha')
            .then(function(response){
                console.log(that);
                that.setState({
                    picImg:that.getPicImg(response.data.result.txt)
                })
                //console.log(response.data.result.txt);
            })
            .catch(function(err){
                console.log(22,err);
            });
    }


    render() {
        const {getFieldDecorator, getFieldError, getFieldValue} = this.props.form;
        return(
            <div className={style.aboutus}>
                <Header/>
                <Crumb position={[{pos:'重设密码'}]}/>
                <div className={style.wlop}>
                    <div className={style.content}>
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                        <span className={style.llctitle}>
                            重设密码
                        </span>
                                <div className={style.perselphone}>
                                    <div className={style.tuxing}>
                                        <FormItem>{getFieldDecorator('password', {
                                            rules: [{
                                                required: true,
                                                message: '请输入正确格式的密码!',
                                                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/
                                            }],
                                        })(<div>
                                            <Input onChange={
                                                (e) => {
                                                    this.setState({password: e.target.value})
                                                }} className={style.inputp} placeholder="密码6-24位字母、数字、字符"
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
                                                    required: true, message: '请检查你的密码!',
                                                }, {
                                                    validator: this.checkPassword,
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
                                                    placeholder="请再次输入密码"/>
                                            )}
                                        </FormItem>
                                    </div>
                                    <FormItem>
                                        <Button type="primary" htmlType="submit"
                                                style={{
                                                    width: '100%',
                                                    height: 40,
                                                    marginTop: 20,
                                                    marginBottom: 60
                                                }}>确认修改密码</Button>
                                    </FormItem>

                                </div>
                            </div>
                        </Form>
                    </div>

                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        hideAuth: bindActionCreators(hideAuth, dispatch),
        resetPwd: bindActionCreators(resetPwd, dispatch),
        showLogin: bindActionCreators(showLogin, dispatch)
    }
}

ImportPwd = connect(mapStateToProps, mapDispatchToProps)(ImportPwd)
const ImportPwdWrap = Form.create()(ImportPwd)
export default ImportPwdWrap;