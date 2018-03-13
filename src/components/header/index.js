import React from 'react';
import style from "./index.css"
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import SideBar from './components/sideBar'
import {bindActionCreators} from 'redux'
import {showLogin, showRegister, hideAuth,yinlist,shenList,importpwd} from '../../actions/auth'
import {logout} from '../../actions/user'
import LoginBox from './components/loginBox'
import RegisterBox from './components/registerBox'
import ResetPwdBox from './components/resetPwdBox'
import ImportPwd from './components/importPwd'
import { Badge,message } from 'antd';
import io from 'socket.io-client'
import axios from  '../../common/axiosConf'

class Header extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {
            open: false,
            position: 'relative',
            otherStyle: true,
            isManage:true

        }
        this.choceType = this.choceType.bind(this)


    }


    componentWillMount() {
        var that=this;
        console.log(1987,window.location.hash);
        var llll=window.location.hash.slice(3, -10)
        console.log(llll.indexOf('email'));
        console.log(llll.indexOf('token'));
        if(llll.indexOf('email')>0&&llll.indexOf('token')==0){

            //console.log(window.location.hash.slice(3,-10));
            var sli1=window.location.hash.slice(3,-10);
            //console.log(sli1.split("&"))
            var slisr=sli1.split("&");
            var slisr1=slisr[0].split("=");
            var slisr2=slisr[1].split("=");
            //console.log(slisr1[1]);
            //console.log(slisr2[1]);
            // that.props.importpwd()
            axios.post('http://192.168.100.105:8000/active', {
                email:slisr1[1],
                token:slisr2[1]
            }).then(function(response){
                    console.log(response.data.code);
                    if(response.data.code==1){
                        that.props.showLogin()
                    }else if(response.data.code==0){
                        message.error(response.data.message);
                    }


                })
                .catch(function(err){
                    console.log(22,err);
                });
        }


        this.choceType();
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

    cli(){

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
                            <Badge dot={this.props.auth.mesList}>
                                <h5 className={style.authtp}>用户中心</h5>
                            </Badge>
                        </Link>

                    <Link to="/checkUser" >
                        <Badge dot={this.props.auth.shenList}>
                        <h5 className={style.authtp}>用户审核</h5>
                        </Badge>
                    </Link>

                    <h5  className={style.authtp} onClick={this.logout} >退出</h5></div>)
            }else {
                return(<div><h5 className={style.authtp}>{this.props.user.userName}</h5>
                    <Badge dot={this.props.auth.mesList}>
                    <Link to="/userCenter"><h5  className={style.authtp}>用户中心</h5></Link>
                    </Badge>
                    <h5  className={style.authtp} onClick={this.logout} >退出</h5></div>)
            }
        }else {
            return(<div><h5 onClick={()=>{this.props.showLogin()}} >登录</h5>      <h5 onClick={this.props.showRegister}  >注册</h5></div>)
        }
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
                                        <Link to="/">首页</Link>
                                    </span>
                                    <span  >
                                        <Link to="/aboutUs">联系我们</Link>
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
                                        <Link to="/">首页</Link>
                                    </span>
                                    <span >
                                        <Link to="/aboutUs">联系我们</Link>
                                    </span>
                                    {/*<span >*/}
                                        {/*<Link to="/DolphinSchool">海豚学院</Link>*/}
                                    {/*</span>*/}
                                </div>

                            </div>
                    }
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
                {this.props.auth.showChangePwd ? <ImportPwd/> : ''}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    console.log(556677,state)
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
        importpwd:bindActionCreators(importpwd,dispatch)
    }
}
var socket=io.connect("ws://192.168.100.105:8000",{withCredentials:''});

socket.on('message',(data)=>{
    alert(data.receiver)
    console.log(this);
    //this.props.shenList()
})
window.socket = socket


Header = connect(mapStateToProps, mapDispatchToProps)(Header)
export default Header;