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
import {forgetPwdSet} from '../../actions/user'
import {bindActionCreators} from 'redux'
import Toast from 'antd-mobile/lib/toast';
import Crumb from '../../components/crumbs'
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';

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

    }

    hideModal = () => {
        this.props.hideAuth()
        // this.setState({
        //     visible: false,
        // });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var sli1=window.location.hash.slice(3,-10);
        //console.log(sli1.split("&"))
        var slisr=sli1.split("&");
        var slisr1=slisr[0].split("=");
        var slisr2=slisr[1].split("=");
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Toast.loading('', 0, null, false)
                this.props.forgetPwdSet({
                    pwd: this.state.password,
                    token: slisr1[1],
                    email:slisr2[1]
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
    checkPassword(a,rule, value, callback){
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback(a);
        } else {
            callback();
        }
    }





    render() {
        const {getFieldDecorator, getFieldError, getFieldValue} = this.props.form;

        const { intl: { formatMessage } } = this.props
        const importRLPwd = formatMessage({id:'importRLPwd'});
        const importLPwd = formatMessage({id:'importLPwd'});
        const importRTPwd = formatMessage({id:'importRTPwd'});
        const importRRTPwd = formatMessage({id:'importRRTPwd'});
        const importCLPwd = formatMessage({id:'importCLPwd'});




        return(
            <div className={style.aboutus}>
                <Header/>
                <Crumb position={[{pos:'重置密码'}]}/>
                <div className={style.wlop}>
                    <div className={style.content}>
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <span className={style.llctitle}>
                                    <FormattedMessage id='resetPwd' defaultMessage='重置密码'/>
                                </span>
                                <div className={style.perselphone}>
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
                                                }} className={style.inputp} placeholder={importLPwd} type={'password'}/></div>
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
                                                style={{
                                                    width: '100%',
                                                    height: 40,
                                                    marginTop: 20,
                                                    marginBottom: 60
                                                }}><FormattedMessage id='pwdChange' defaultMessage='确认修改密码'/></Button>
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
        forgetPwdSet: bindActionCreators(forgetPwdSet, dispatch),
        showLogin: bindActionCreators(showLogin, dispatch)
    }
}

ImportPwd = connect(mapStateToProps, mapDispatchToProps)(ImportPwd)
const ImportPwdWrap = Form.create()(ImportPwd)
export default injectIntl(ImportPwdWrap);