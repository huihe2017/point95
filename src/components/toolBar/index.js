import React from 'react';
import style from "./index.css"
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import { BackTop } from 'antd';
import {bindActionCreators} from 'redux'
import {showLogin, showRegister, hideAuth} from '../../actions/auth'



class ToolBar extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {

        }
    }

    openwin() {
        window.open ("http://cloud.xiaoi.com/web/index.jsp?uid=2159430", "newwindow", "height=755, width=648, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no,left=500,top=800")
//写成一行
    }
    render() {

        return (
            <div className={style.wrap}>
                <div>
                    <BackTop>
                        <div className={style.gotop}>

                        </div>
                    </BackTop>
                </div>
                <div className={style.speedaccount}>
                    极速开户
                </div>
                <div className={style.contactus} onClick={this.openwin.bind(this)}>
                    联系客服
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

ToolBar = connect(mapStateToProps, mapDispatchToProps)(ToolBar)
export default ToolBar;