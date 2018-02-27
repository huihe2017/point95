import React from 'react';
import style from "./index.css"
import Title from '../../../../components/title/index'
import ContentList from '../../../../components/contentList/index'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import {Form, Input, Button} from 'antd'
import {bindActionCreators} from 'redux'
import {showLogin} from '../../../../actions/auth'
import {modifyPwd, logout} from '../../../../actions/user'
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';

const FormItem = Form.Item;

function handleChange(value) {
    console.log(`selected ${value}`);
}

const formItemLayout = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
    },
};

class ForgetPwd extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {
            initPwd: '',
            pwd: '',
            confirmPwd: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Toast.loading('', 0, null, false)
                this.props.modifyPwd(
                    this.state
                    , (errorText) => {
                        Toast.hide()
                        if (errorText) {
                            Toast.info(errorText, 3, null, false)
                        } else {
                            this.props.logout({}, (errorText) => {
                                if (errorText) {
                                    Toast.info(errorText, 3, null, false)
                                } else {
                                    this.props.showLogin({}, (errorText) => {
                                        if (errorText) {
                                        } else {
                                            hashHistory.push('/')
                                        }
                                    })
                                }


                            })


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
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className={style.wrap}>

                <Form onSubmit={this.handleSubmit}>
                    <div className={style.content}>
                        <div className={style.perselphone}>
                            <div className={style.tuxing}>
                                <FormItem {...formItemLayout} colon={false} label={<span
                                    style={{marginRight: 30}}>初始密码</span>}>{getFieldDecorator('firstPassword', {
                                    rules: [{
                                        required: true,
                                        message: '请输入正确格式的密码!',
                                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/
                                    }],
                                })(<div>
                                    <Input onChange={(e) => {
                                        this.setState({initPwd: e.target.value})
                                    }} type={'password'} className={style.inputp} placeholder="密码6-24位字母、数字、字符"/></div>
                                )}
                                </FormItem>
                            </div>
                            <div className={style.tuxing}>

                                <FormItem {...formItemLayout} colon={false} label={<span
                                    style={{marginRight: 30}}>设置密码</span>}>{getFieldDecorator('password', {
                                    rules: [{
                                        required: true,
                                        message: '请输入正确格式的密码!',
                                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/
                                    }],
                                })(<div className={style.inp}>
                                    <Input onChange={(e) => {
                                        this.setState({pwd: e.target.value})
                                    }} type={'password'} className={style.inputp} placeholder="密码6-24位字母、数字、字符"/></div>
                                )}
                                </FormItem>
                            </div>
                            <div className={style.tuxing}>
                                <FormItem  {...formItemLayout} colon={false}
                                           label={<span style={{marginRight: 30}}>设置密码</span>} hasFeedback>
                                    {getFieldDecorator('confirm', {
                                        rules: [{
                                            required: true, message: '请检查你的密码!',
                                        }, {
                                            validator: this.checkPassword,
                                        }],
                                    })(
                                        <div>
                                            <Input onChange={(e) => {
                                                this.setState({confirmPwd: e.target.value})
                                            }} type="password" className={style.inputp} onBlur={this.handleConfirmBlur}
                                                   placeholder="请再次输入密码"/>
                                        </div>
                                    )}
                                </FormItem>
                            </div>
                            <FormItem>
                                <Button type="primary" htmlType="submit" style={{
                                    width: 160,
                                    height: 40,
                                    marginTop: 40,
                                    marginLeft: 90,
                                    fontSize: 18,
                                    display: 'block'
                                }}>确认</Button>
                            </FormItem>
                        </div>
                    </div>
                </Form>
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
        modifyPwd: bindActionCreators(modifyPwd, dispatch),
        logout: bindActionCreators(logout, dispatch),
        showLogin: bindActionCreators(showLogin, dispatch)
    }
}

ForgetPwd = connect(mapStateToProps, mapDispatchToProps)(ForgetPwd)

const WrappedForgetPwd = Form.create()(ForgetPwd)

export default WrappedForgetPwd;