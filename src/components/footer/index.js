import React from 'react';
import style from "./index.css"
import Title from '../title/index'
import ContentList from '../contentList/index'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import ImportPwd from '../header/components/importPwd'

class Footer extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className={style.footer}>
                <div className={style.blueLine}></div>
                <p className={style.foottitle}>
                    免责声明
                </p>
                <p className={style.footcon}>
                    本网站提供的信息是严格的意见，八角策略有限公司（“公司”），是专为信息的目的并不是要解释，在任何情况下，以暗示或其他方式，如出售要约或招揽购买或 <br/>交易的任何商品或证券或其他资产。信息来源于被认为是可靠的，但决不保证。没有任何保证是隐含的或可能的，对未来条件的预测是尝试的。
                </p>
                <div className={style.footline}>

                </div>
                <p className={style.footcopy}>
                    Copyright © Point95 Global (Hong Kong) Limited 2018 All Rights Reserved
                </p>
                {this.props.auth.showRegisterTip ? <ImportPwd word={'注册成功'}/> : ''}
                {this.props.auth.showForgetTip ? <ImportPwd  word={'提交成功'}/> : ''}
            </div>

        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user,
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

Footer = connect(mapStateToProps, mapDispatchToProps)(Footer)
export default Footer;