import React from 'react';
import style from "./index.css"
import { Button, Table, Icon,Upload,Badge, Menu, Dropdown, Modal,Popconfirm,LocaleProvider,Tabs  } from 'antd'
import {browserHistory,hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import ContentList from '../../components/contentList'
import Header from '../../components/header'
import Footer from '../../components/footer'
import ToolBar from '../../components/toolBar'
import Crumb from '../../components/crumbs'
import axios from  '../../common/axiosConf';
import {showLogin,shenList,yinlist} from '../../actions/auth'
import {bindActionCreators} from 'redux'
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';
import Check from './components/ckeck';
import CheckHistory from './components/checkHistory';
import Chat from './components/userChat';

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;


class PartnerEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            previewVisible: false,
            isBase:true,
            data:[],
            visible:false,
            visible1:false,

        }
    }

    render() {
        if (!localStorage.getItem('token')) {
            this.props.showLogin({}, (errorText) => {
                if (errorText) {
                } else {
                    hashHistory.push('/')
                }
            })
            return null
        }
        const { intl: { formatMessage } } = this.props
        const userCheck1 = formatMessage({id:'userCheck1'});
        const userCheck2 = formatMessage({id:'userCheck2'});
        const userCheck3 = formatMessage({id:'userCheck3'});
        const userCheck4 = formatMessage({id:'userCheck4'});
        const pass = formatMessage({id:'pass'});
        const noPass = formatMessage({id:'noPass'});
        const yes = formatMessage({id:'yes'});
        const no = formatMessage({id:'no'});
        const isSure = formatMessage({id:'isSure'});
        const basicCheck = formatMessage({id:'basicCheck'});
        const advancedCheck = formatMessage({id:'advancedCheck'});
        const userCheck = formatMessage({id:'userCheck'});


        const {  previewImage,previewVisible  } = this.state;
        return (

                <div className={style.partnerEntry}>
                    <Header/>
                    <Crumb position={[{pos:userCheck}]}/>
                    <div className={style.toolbar}>
                        <ToolBar/>
                    </div>
                    <div className={style.wlop}>
                        <Tabs type="card">
                            <TabPane tab={
                                <div className={style.tapcard}>
                                    <span className={style.tapword}>用户审核</span></div>} key="1" >
                                <Check/>

                            </TabPane>
                            <TabPane tab={<div className={style.tapcard}>
                                <span className={style.tapword} >审核历史</span>
                            </div>} key="2">
                                <CheckHistory/>
                            </TabPane>
                            <TabPane tab={
                                <div className={style.tapcard}>
                                    <span className={style.tapword}>用户聊天</span>
                                </div>} key="3">
                                <Chat/>
                            </TabPane>
                            <TabPane tab={<div className={style.tapcard}>
                                <span className={style.tapword} style={{borderRight:'none'}}>发送邮件</span>
                            </div>} key="4">
                                <p>我是第四页</p>
                            </TabPane>
                        </Tabs>
                    </div>
                    <Footer/>
                </div>

        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user,
        auth:state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showLogin: bindActionCreators(showLogin, dispatch),
        shenList: bindActionCreators(shenList, dispatch),
        yinlist: bindActionCreators(yinlist, dispatch),
    }
}

PartnerEntry = connect(mapStateToProps, mapDispatchToProps)(PartnerEntry);
export default injectIntl(PartnerEntry);