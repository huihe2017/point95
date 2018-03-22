import React from 'react';
import style from "./index.css"
import {Input, Form, Tabs, Icon} from 'antd'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router';
import {bindActionCreators} from 'redux'
import {showLogin} from '../../actions/auth'

import Header from '../../components/header'
import Footer from '../../components/footer'
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';
import ToolBar from '../../components/toolBar'
import Crumb from '../../components/crumbs'
import SideMenu from './sideMenu'
import UserData from './components/userData';
import BasicVip from './components/basicVip';
import AdvancedVip from './components/advancedVip';
import LinkMan from './components/linkMan';
import NewsLink from './components/newsList'
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const userData = {
    portrait: 'http://img1.tgbusdata.cn/v2/thumb/jpg/NkRCMiw2NDAsMTAwLDQsMywxLC0xLDAscms1MA==/u/wow.tgbus.com/UploadFiles_2396/201605/20160530094443812.jpg',
    userName: '',
    phone: ['', 33],
    MT4user: 6666666,
    floating: 0,
    status: 0,
    worth: 0,
    balance: 0,
    dynamics: [
        // {
        //     state: 'complete',
        //     content: '完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成'
        // },
        // {
        //     state: 'unComplete',
        //     content: '未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成'
        // },
        // {
        //     state: 'waiting',
        //     content: '等待完成等待完成等待完成等待完等待完成等待完成等待完成等待完成等待完成等待完成等待完成等待完成成'
        // },
        // {
        //     state: 'news',
        //     content: '新闻动态新闻动态新闻动态新闻动态'
        // }{
        //     state: 'complete',
        //     content: '完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成完成'
        // },
        // {
        //     state: 'unComplete',
        //     content: '未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成未完成'
        // },
        // {
        //     state: 'waiting',
        //     content: '等待完成等待完成等待完成等待完等待完成等待完成等待完成等待完成等待完成等待完成等待完成等待完成成'
        // },
        // {
        //     state: 'news',
        //     content: '新闻动态新闻动态新闻动态新闻动态'
        // }
    ],
}

class userCenterHeadView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
            tabsActiveKey: "1",
            current:'1'
        }
    }

    componentDidMount() {

    }

    page(e){
        this.setState({
            current: e.key,
        });
    }

    pageShow(){
        if(this.state.current=='5'){
            return  <div>
                <UserData/>
            </div>
        }else if(this.state.current=='1'){
            return  <div><BasicVip/></div>
        }else if(this.state.current=='2'){
            return  <div>
                <AdvancedVip/>
            </div>
        }else if(this.state.current=='3'){
            return  <div><LinkMan/></div>
        }else if(this.state.current=='4'){
            return  <div><NewsLink/></div>
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
        let imgurl = "";
        const { intl: { formatMessage } } = this.props
        const userCenter = formatMessage({id:'userCenter'});

        return (
            <div className={style.aboutus}>
                <Header/>
                <Crumb position={[{pos:userCenter}]}/>

                <div className={style.wlop}>
                    <div className={style.wlfll}>
                        <SideMenu page={this.page.bind(this)}/>

                    </div>
                    <div className={style.wlflr}>
                        <ul>
                            {this.pageShow()}
                        </ul>
                    </div>
                    <div style={{clear:'both'}}></div>
                </div>
                <Footer/>
            </div>

        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user,
        foreignExchange: state.foreignExchange
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showLogin: bindActionCreators(showLogin, dispatch),


    }
}


userCenterHeadView = connect(mapStateToProps, mapDispatchToProps)(userCenterHeadView)
export default injectIntl(userCenterHeadView);