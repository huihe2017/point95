import React from 'react';
import style from "./index.css"
import {Input, Form, Tabs, Icon} from 'antd'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router';
import {bindActionCreators} from 'redux'
import {showLogin} from '../../actions/auth'
import {getDetailMsg} from '../../actions/user'
import InGold from './components/inGold'
import OutGold from './components/outGold'
import DetailUserMsg from './components/detailUserMsg'
import History from './components/history'
import ForgetPwd from './components/forgetPwd'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';
import ToolBar from '../../components/toolBar'
import Crumb from '../../components/crumbs'

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
            tabsActiveKey: "1"
        }
    }

    // getTime(e){
    //     let now=new Date(e);
    //     return   [now.getFullYear(),now.getMonth()+1,now.getDate()].join("-")+" "+[now.getHours(),now.getMinutes()].join(":");
    // }
    showdata(e) {
        if (e.length == 0) {
            return (
                <img src={require('./images/none.png')} alt="" className={style.none}/>
            )
        } else {
        }

    }

    change(vaildMsg, name) {
        // console.log(vaildMsg)
        // userData.change(vaildMsg,name)
    }

    submitFn() {
        // userData.submitFn()
    }

    redact() {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    componentDidMount() {
        this.props.getDetailMsg({}, (errorText) => {
            if (errorText) {
                Toast.fail(errorText, 3, null, false)
            } else {
            }
        })
    }

    render() {
        if (!this.props.user.userName) {
            this.props.showLogin({}, (errorText) => {
                if (errorText) {
                } else {
                    hashHistory.push('/')
                }
            })
            return null
        }
        let imgurl = "";

        return (
            <div className={style.aboutus}>
                <Header/>
                <Crumb position={[{pos:'个人中心'}]}/>
                <div className={style.toolbar}>
                    <ToolBar/>
                </div>
                <div className={style.wlop}>
                    <div className={style.userCenterHead}>
                        <div className={style.userCHl}>
                        <span className={style.userCHlt}>
                            基本资料
                        </span>
                            <div className={style.userchvheader}>
                                <a href="javascript:void (0);" onClick={this.redact.bind(this)}
                                   className={style.redact}>
                                    <span hidden={!this.state.isShow}>编辑信息</span>
                                    <span hidden={this.state.isShow} onClick={this.submitFn.bind(this)}>保存信息</span>
                                </a>
                                <div className={style.avatar}>
                                    <img src={userData.portrait ? userData.portrait : require('./images/none.png')}
                                         alt=""/>
                                    <div className={style.shade} hidden={this.state.isShow}>
                                        <input type="file" className={style.file}/>
                                        点击上传
                                    </div>
                                </div>

                                <div className={style.userhc}>
                                    <div className={style.userhch} hidden={!this.state.isShow}>
                                        <div className={style.username}>
                                            {userData.userName}
                                        </div>
                                        <div className={style.userphone}>
                                            <span>{this.props.user.userName}</span>
                                        </div>
                                    </div>
                                    <div className={style.userhcc} hidden={!this.state.isShow}>
                                        <div>
                                            出金绑定银行卡：
                                            {
                                                (this.props.user.status==='2'?false:true) ?
                                                    <a onClick={(e) => {
                                                        this.setState({tabsActiveKey: "3"})
                                                    }}
                                                       href="javascript:void (0);">
                                                        去绑定
                                                    </a>
                                                    :
                                                    <span>{this.props.user.bankNo}</span>
                                            }
                                        </div>
                                        <div>
                                            MT4平台账号：{this.props.user.MT4}
                                        </div>
                                    </div>
                                    <div className={style.userr} hidden={this.state.isShow}>
                                    <span className={style.nicktext}>
                                        ID昵称，限制8个中文字符，其他字符限制12个
                                    </span>
                                        <Form layout="inline">
                                            <FormItem>
                                                <Input style={{
                                                    width: 300,
                                                    lineHeight: 40,
                                                    height: 40,
                                                    paddingLeft: 12,
                                                    fontSize: 16
                                                }} value={userData.userName}/>
                                            </FormItem>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                            <div className={style.userchvfooter}>
                                <div className={style.floating}>
                                    <div className={style.money}>
                                        ${userData.floating}
                                    </div>
                                    <div className={style.top}>
                                        浮动盈亏
                                    </div>
                                </div>
                                <div className={style.worth}>
                                    <div className={style.money}>
                                        ${userData.worth}
                                    </div>
                                    <div className={style.top}>
                                        净值
                                    </div>
                                </div>
                                <div className={style.balance}>
                                    <div className={style.mone}>
                                        ${userData.balance}
                                    </div>
                                    <div className={style.to}>
                                        余额
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.userCHr}>
                       <span className={style.userCHlt}>
                            一月内资讯记录
                        </span>
                            <div className={style.userCHrc}>
                                {
                                    userData.dynamics.length == 0 ? (
                                        <img src={require('./images/none.png')} alt="" className={style.none}/>
                                    ) : (userData.dynamics.map((v) => {
                                        return (
                                            <div className={style.item + " " + style.clearfloat}>
                                                <div className={style.state}>
                                                    <img src={require(`./images/${v.state}.png`)} alt=""/>
                                                </div>
                                                <span>
                            {v.content}
                        </span>
                                            </div>
                                        )
                                    }))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={style.cardcontainer}>
                        <Tabs activeKey={this.state.tabsActiveKey} onChange={(e) => {
                            this.setState({tabsActiveKey: e})
                        }} type="card">
                            <TabPane tab={<span style={{display: 'block', width: 240}}><Icon type="download"/> &nbsp;
                                账户入金</span>} key="1">
                                <InGold/>
                            </TabPane>
                            <TabPane tab={<span style={{display: 'block', width: 240}}><Icon type="upload"/> &nbsp;账户出金</span>}
                                     key="2">
                                <OutGold/>
                            </TabPane>
                            <TabPane tab={<span style={{display: 'block', width: 240}}><Icon type="file-text"/> &nbsp;
                                用户资料</span>} key="3">
                                <DetailUserMsg/>
                            </TabPane>
                            <TabPane
                                tab={<span style={{display: 'block', width: 240}}><Icon type="lock"/> &nbsp;更改密码</span>}
                                key="4">
                                <ForgetPwd/>
                            </TabPane>
                            <TabPane tab={<span style={{display: 'block', width: 240}}><Icon type="bar-chart"/> &nbsp;
                                历史纪录</span>} key="5">
                                <History/>
                            </TabPane>
                        </Tabs>
                    </div>
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
        getDetailMsg: bindActionCreators(getDetailMsg, dispatch)

    }
}


userCenterHeadView = connect(mapStateToProps, mapDispatchToProps)(userCenterHeadView)
export default userCenterHeadView;