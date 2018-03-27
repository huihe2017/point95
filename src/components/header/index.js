import React from 'react';
import style from "./index.css"
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import SideBar from './components/sideBar'
import {bindActionCreators} from 'redux'
import {showLogin, showRegister, hideAuth,yinlist,shenList,importpwd,isChinese,isEnglish} from '../../actions/auth'
import {logout} from '../../actions/user'
import LoginBox from './components/loginBox'
import RegisterBox from './components/registerBox'
import ResetPwdBox from './components/resetPwdBox'
import { Badge,message,Radio,Button,Modal  } from 'antd';
import io from 'socket.io-client'
import axios from  '../../common/axiosConf'
import enUS from 'antd/lib/locale-provider/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { IntlProvider,addLocaleData,FormattedMessage } from 'react-intl';
import {Launcher} from 'react-chat-window'
moment.locale('en');


const ButtonGroup = Button.Group;

class Header extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {
            open: false,
            position: 'relative',
            otherStyle: true,
            isManage:true,
            visible:false,
            messageList : []

        }
        this.choceType = this.choceType.bind(this)


    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    componentWillMount() {
        var that=this;
        var llll=window.location.hash.slice(3, -10)
        if(llll.indexOf('email')>0&&llll.indexOf('token')==0){
            //console.log(window.location.hash.slice(3,-10));
            var sli1=window.location.hash.slice(3,-10);
            var slisr=sli1.split("&");
            var slisr1=slisr[0].split("=");
            var slisr2=slisr[1].split("=");
            axios.post('http://192.168.100.105:8000/active', {
                email:slisr2[1],
                token:slisr1[1]
            }).then(function(response){
                console.log(response.data.code);if(response.data.code==1){
                    that.props.showLogin()
                    }else if(response.data.code==0){
                        message.error(response.data.message);
                    }
                })
                .catch(function(err){
                    console.log(22,err);
                });
        }
        axios.get('http://192.168.100.105:8000/unRead', {
            params: {
                token:localStorage.getItem('token')
            }
        }).then(function(response){
            console.log(response);
        }).catch(function(err){
                console.log(err);
            });

        this.choceType();

        axios.get('http://192.168.100.105:8000/roomList', {
            params:{
                token:localStorage.getItem('token')
            }})
            .then(function (response) {
                console.log('lalalal',response.data.result);
                that.setState({
                    userData:response.data.result
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    }


    tozh(){
        //alert(this.props.auth.isEnglish)
        this.props.isChinese()
    }
    toen(){
        //alert(this.props.auth.isEnglish)
        this.props.isEnglish()
    }

    componentWillReceiveProps() {
        // if (window.location.hash.substr(1).indexOf('/') !== -1) {
        //     this.setState({position: 'relative'})
        //     this.setState({otherStyle: true})
        //     window.onscroll = null
        //     return true
        // } else {
        //     if (!window.onscroll) {
        //         this.choceType()
        //         return true
        //     }
        // }
        // return true
    }

    choceType() {
        if (window.location.hash.substr(1).indexOf('/?') !== -1) {
            this.setState({position: 'absolute'})
            this.setState({otherStyle: false})
            let dance = document.body.clientWidth * 0.46
            let danceCopy = dance
            window.onscroll = null
            window.onscroll = (e) => {
                //console.log(document.body.scrollTop)
                var oTop = document.body.scrollTop == 0 ? document.documentElement.scrollTop : document.body.scrollTop;

                if (oTop < danceCopy) {
                    this.setState({position: 'absolute'})
                    this.setState({otherStyle: false})
                    return false
                }

                if (oTop - dance < 0) {
                    this.setState({position: 'fixed'})
                    this.setState({otherStyle: true})
                } else {
                    this.setState({position: 'absolute'})
                    this.setState({otherStyle: false})
                }
                dance = oTop
            }
        }
    }

    changeLocale(e){
        console.log('ee',e);
    }

    openSlider = () => {
        this.setState({open: true});
    }
    closeSlider = () => {
        this.setState({open: false});
    }
    logout = ()=>{
        this.props.logout({

        }, (errorText) => {
            if (errorText) {
            } else {
                hashHistory.push('/')
            }
        })
    }
    isManage(){
        if(this.props.user.token){
            if(localStorage.getItem('role')==1){
                return(<div><h5 className={style.authtp}>{this.props.user.userName}</h5>

                        <Link to="/userCenter">
                            <Badge dot={localStorage.getItem('unReadMsg')==2?true:false}>
                                <h5 className={style.authtp}>
                                    <FormattedMessage
                                    id='userCenter'
                                    defaultMessage='用户中心'
                                />
                                </h5>
                            </Badge>
                        </Link>

                    <Link to="/checkUser" >
                        <Badge dot={this.props.auth.shenList}>
                        <h5 className={style.authtp}>
                            <FormattedMessage
                            id='userCheck'
                            defaultMessage='用户审核'
                        /></h5>
                        </Badge>
                    </Link>

                    <h5  className={style.authtp} onClick={this.logout} ><FormattedMessage
                        id='logout'
                        defaultMessage='退出'
                    /></h5></div>)
            }else {
                return(<div><h5 className={style.authtp}>{this.props.user.userName}</h5>
                    <Badge dot={localStorage.getItem('unReadMsg')==2?true:false}>
                    <Link to="/userCenter"><h5  className={style.authtp}><FormattedMessage
                        id='userCenter'
                        defaultMessage='用户中心'
                    /></h5></Link>
                    </Badge>
                    <h5 className={style.authtp} onClick={this.logout} ><FormattedMessage
                        id='logout'
                        defaultMessage='退出'
                    /></h5></div>)
            }
        }else {
            return(<div><h5 onClick={()=>{this.props.showLogin()}} ><FormattedMessage
                id='login'
                defaultMessage='登陆'
            /></h5>      <h5 onClick={this.props.showRegister}  ><FormattedMessage
                id='register'
                defaultMessage='注册'
            /></h5></div>)
        }
    }

    componentDidMount(){
        let socket=io.connect("ws://192.168.100.105:8000");
        socket.on('connected',(data)=>{
            if(localStorage.getItem('role')==1){
                socket.emit('setAdmin',{name:55})
            }

        })

        socket.on('message',(data)=>{
            console.log('message');
            //this.props.shenList()
        })

        window.socket = socket
    }
    _onMessageWasSent(message) {

        window.socket.emit('transfer',{token:localStorage.getItem('token'),role:localStorage.getItem('role'),content:message.data.text})
        console.log(message.data.text);

        this.setState({
            messageList: [...this.state.messageList, message]
        })
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    render() {

        return (
            <div>
                <div
                    className={this.state.otherStyle ? ( style.wrap + ' ' + style[this.state.position] + ' ' + style.otherStyle) : ( style.wrap + ' ' + style[this.state.position])}>
                    <div className={style.logo}>
                        {
                            this.state.otherStyle ? <Link to="/"><img src={require("./logoO.png")}/></Link> :
                                <Link to="/">
                                    <img src={require("./logo.png")}/>
                                </Link>
                        }
                    </div>
                    {
                        this.state.otherStyle ?
                            <div className={style.headnav}>
                                <div>
                                    <div className={style.linet}>

                                    </div>
                                    <span  >
                                        <Link to="/">
                                            <FormattedMessage
                                            id='home'
                                            defaultMessage='首页'
                                        />
                                        </Link>
                                    </span>
                                    <span  >
                                        <Link to="/aboutUs">
                                            <FormattedMessage
                                                id='contactUs' defaultMessage='联系我们'/>
                                        </Link>
                                    </span>
                                    <span onClick={this.showModal}>
                                        {/*<Link to="/aboutUs">*/}
                                            {/*<FormattedMessage*/}
                                                {/*id='contactUs' defaultMessage=/>*/}
                                        {/*</Link>*/}
                                        联系管理员
                                    </span>
                                    {/*<span >*/}
                                        {/*<Link to="/DolphinSchool">海豚学院</Link>*/}
                                    {/*</span>*/}
                                </div>
                            </div>:
                            <div className={style.headnavt}>
                                <div>
                                    <div className={style.linet}>
                                    </div>
                                    <span >
                                        <Link to="/">
                                            <FormattedMessage
                                                id='home'
                                                defaultMessage='首页'
                                            /></Link>
                                    </span>
                                    <span >
                                        <Link to="/aboutUs"><FormattedMessage
                                            id='contactUs' defaultMessage='联系我们'/></Link>
                                    </span>
                                    <span onClick={this.showModal}>
                                        {/*<Link to="/aboutUs">*/}
                                        {/*<FormattedMessage*/}
                                        {/*id='contactUs' defaultMessage=/>*/}
                                        {/*</Link>*/}
                                        联系管理员
                                    </span>

                                </div>

                            </div>
                    }
                    <Modal
                        visible={this.state.visible}
                        width={800}
                        onCancel={this.handleCancel}
                        style={{backgroundColor:'transparent',borderTopLeftRadius: 9,
                            borderTopRightRadius: 9,overflow:'hidden'}}
                    >
                        <div className={style.chatBox}>
                            <Launcher
                                agentProfile={{
                                    teamName: 'react-live-chat',
                                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                                }}
                                onMessageWasSent={this._onMessageWasSent.bind(this)}
                                messageList={this.state.messageList}
                                showEmoji
                            />
                        </div>

                    </Modal>


                    <ButtonGroup>
                        <Button onClick={this.tozh.bind(this)}>中文</Button>
                        <Button onClick={this.toen.bind(this)}>English</Button>
                    </ButtonGroup>
                    <div onMouseOver={this.openSlider} onMouseLeave={this.closeSlider} className={style.sider} hidden={true}>
                        全部导航
                        <SideBar show={this.state.open}/>
                    </div>
                    {
                        this.state.otherStyle ?
                    <div className={style.auth}>
                        {
                            this.isManage()
                        }
                    </div>:
                            <div className={style.autht}>
                                {
                                    this.isManage()
                                }
                            </div>
                    }


                </div>
                {this.props.auth.showLoginBox ? <LoginBox/> : ''}
                {this.props.auth.showRegisterBox ? <RegisterBox/> : ''}
                {this.props.auth.showResetPwdBox ? <ResetPwdBox/> : ''}

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
    return {
        showLogin: bindActionCreators(showLogin, dispatch),
        logout: bindActionCreators(logout, dispatch),
        showRegister: bindActionCreators(showRegister, dispatch),
        shenList: bindActionCreators(shenList, dispatch),
        importpwd:bindActionCreators(importpwd,dispatch),
        isChinese:bindActionCreators(isChinese,dispatch),
        isEnglish:bindActionCreators(isEnglish,dispatch),
    }
}
var socket=io.connect("ws://192.168.100.105:8000",{withCredentials:''});

socket.on('message',(data)=>{
    // alert(data.receiver)
    console.log(this);
    //this.props.shenList()
})
window.socket = socket


Header = connect(mapStateToProps, mapDispatchToProps)(Header)
export default Header;