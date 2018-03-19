import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {Modal, Input, Select, Form, AutoComplete, Button, Row, Col} from 'antd';
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {hideAuth, showLogin} from '../../../../actions/auth'
import {resetPwd} from '../../../../actions/user'
import Countdown from '../../../countdown/index'
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';
import axios from  '../../../../common/axiosConf'

const confirm = Modal.info;
const FormItem = Form.Item;
const Option = Select.Option;


function handleChange(value) {
    console.log(`selected ${value}`);
}

class ImportPwdBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:true
        }
    }

    success() {
        Modal.success({
            title: this.props.word,
            content: '请前往注册的邮箱，根据提示进行下一步操作',
        });
    }

    hideModal = () => {
        this.props.hideAuth()
    }

    render() {
        const {getFieldDecorator, getFieldError, getFieldValue} = this.props.form;

        return (
            <div className={style.wrap}>
                {this.success()}
            </div>
        )

    }
}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        hideAuth: bindActionCreators(hideAuth, dispatch),
        resetPwd: bindActionCreators(resetPwd, dispatch),
        showLogin: bindActionCreators(showLogin, dispatch)
    }
}

ImportPwdBox = connect(mapStateToProps, mapDispatchToProps)(ImportPwdBox)
const ImportPwdBoxWrap = Form.create()(ImportPwdBox)

export default ImportPwdBoxWrap;
