import React from 'react';
import style from "./index.css"
import Title from '../title/index'
import ContentList from '../contentList/index'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import ImportPwd from '../header/components/importPwd'
import { IntlProvider,addLocaleData,FormattedMessage } from 'react-intl';


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
                    <FormattedMessage id='disclaimer' defaultMessage='免责声明'/>
                </p>
                <p className={style.footcon}>
                    <FormattedMessage id='disclaimer1' defaultMessage=''/><br/><FormattedMessage id='disclaimer2' defaultMessage=''/><br/><FormattedMessage id='disclaimer3' defaultMessage=''/>

                </p>
                <div className={style.footline}>

                </div>
                <p className={style.footcopy}>
                    Copyright © Point95 Global (Hong Kong) Limited 2018 All Rights Reserved
                </p>
                {this.props.auth.showRegisterTip ? <ImportPwd word='reg'/> : ''}
                {this.props.auth.showForgetTip ? <ImportPwd  word='forget'/> : ''}
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