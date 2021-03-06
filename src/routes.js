import React from 'react'
import {Route, Router, IndexRoute, hashHistory} from 'react-router'
import Home from './containers/home/'



import UserCenter from './containers/userCenter/'
import Log from './components/header/components/loginBox/'
import Reg from './components/header/components/registerBox/'

import AboutUs from './containers/aboutUs/'

import CheckUser from './containers/checkUser/'
import ImportPwd from './containers/resetPwd/'
import { LocaleProvider } from 'antd'
import {IntlProvider} from 'react-intl';
import zh_CN from './common/zh_CN';
import en_US from './common/en_US';
import {connect} from "react-redux";
import enUS from 'antd/lib/locale-provider/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('en');


class FF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <IntlProvider locale={this.props.auth.isEnglish?'en':'zh'} messages={this.props.auth.isEnglish?en_US:zh_CN}>
                <LocaleProvider locale={this.props.auth.isEnglish?enUS:''}>
                <Router history={hashHistory}>
                    <Route path="/" component={Home}/>

                    <Route path="/userCenter" component={UserCenter}/>
                    <Route path="/log" component={Log}/>
                    <Route path="/reg" component={Reg}/>
                    <Route path="/aboutUs" component={AboutUs}/>

                    <Route path="/checkUser" component={CheckUser}/>
                    <Route path="/importPwd" component={ImportPwd}/>
                </Router>
                </LocaleProvider>
            </IntlProvider>
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

FF = connect(mapStateToProps, mapDispatchToProps)(FF)
export default FF;





