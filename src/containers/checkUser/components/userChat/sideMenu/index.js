import React from 'react';
import { Menu, Icon, Button,Badge } from 'antd';
import {bindActionCreators} from 'redux'
import {mesList,hmesList} from '../../../../../actions/auth'
import {connect} from 'react-redux'
import style from './index.css'
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';
import axios from "../../../../../common/axiosConf";

const SubMenu = Menu.SubMenu;

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '1'
        }
    }
    handleClick(e){
        this.setState({
            current: e.key,
        });
        this.props.page(e)
    }
    componentWillMount(){
        console.log(111);
        let that=this
        axios.get('http://192.168.100.105:8000/roomList', {
            params:{
                token:localStorage.getItem('token')
            }})
            .then(function (response) {
                console.log('lalalal',response);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    render() {

        return (
            <div style={{ width: 256 }}>

                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    onClick={this.handleClick.bind(this)}
                    selectedKeys={[this.state.current]}
                >
                    <Menu.Item key="1">
                        <Icon type="idcard" />
                        <span className={style.titword}><FormattedMessage id='basicVIP' defaultMessage='初级认证'/></span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="safety" />
                        <span className={style.titword}><FormattedMessage id='advancedVIP' defaultMessage='高级认证'/></span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="contacts" />
                        <span className={style.titword}><FormattedMessage id='linkman' defaultMessage='联系人'/></span>
                    </Menu.Item>

                </Menu>
            </div>
        );
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

SideMenu = connect(mapStateToProps, mapDispatchToProps)(SideMenu);
export default SideMenu;