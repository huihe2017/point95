import React from 'react';
import style from "./index.css"
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import SideBar from './components/sideBar'
import {bindActionCreators} from 'redux'
import {showLogin, showRegister, hideAuth} from '../../actions/auth'
import {logout} from '../../actions/user'
import LoginBox from './components/loginBox'
import RegisterBox from './components/registerBox'
import ResetPwdBox from './components/resetPwdBox'
import { Badge } from 'antd';

const data = [
    {
        key: 1,
        time: '2017/12/15 15:00',
        description: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',

    },{
        key: 2,
        nickname: 'Sakura',
        time: '2017/12/15 15:00',
        description: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',

    },{
        key: 3,
        time: '2017/12/15 16:00',
        description: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',

    },{
        key: 4,
        time: '2017/12/15 12:00',
        description: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内',

    },
];

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
        this.choceType();
        localStorage.setItem('meslist',data.length)
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
                            <Badge count={localStorage.getItem('meslist')} overflowCount={10}>
                                <h5 className={style.authtp}>个人中心</h5>
                            </Badge>
                        </Link>


                    <Link to="/checkUser">
                        <Badge count={4} overflowCount={10}>
                        <h5 className={style.authtp}>用户审核</h5>
                        </Badge>
                    </Link>

                    <h5  className={style.authtp} onClick={this.logout} >退出</h5></div>)
            }else {
                return(<div><h5 className={style.authtp}>{this.props.user.userName}</h5>
                    {/*<Badge count={5} overflowCount={10}>*/}
                    <Link to="/userCenter"><h5  className={style.authtp}>个人中心</h5></Link>
                    {/*//</Badge>*/}
                    <h5  className={style.authtp} onClick={this.logout} >退出</h5></div>)
            }
        }else {
            return(<div><span onClick={()=>{this.props.showLogin()}} >登录</span>      <span onClick={this.props.showRegister}  >注册</span></div>)
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
        showRegister: bindActionCreators(showRegister, dispatch)
    }
}

Header = connect(mapStateToProps, mapDispatchToProps)(Header)
export default Header;