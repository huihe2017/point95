import React from 'react';
import { Menu, Icon, Button,Badge } from 'antd';
import {bindActionCreators} from 'redux'
import {mesList,hmesList} from '../../../actions/auth'
import {connect} from 'react-redux'
import style from './index.css'
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';

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
        if(e.key==4){
            console.log(111)
            //localStorage.setItem('meslist',0)
            this.props.hmesList()
            localStorage.removeItem('unReadMsg')
        }
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
                    {/*<Menu.Item key="5">*/}
                        {/*<Icon type="pie-chart" />*/}
                        {/*<span className={style.titword}>基础资料</span>*/}
                    {/*</Menu.Item>*/}
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
                    <Menu.Item key="4">

                        <Icon type="mail" />
                        <Badge dot={localStorage.getItem('unReadMsg')==2?true:false}>
                            <span className={style.titword}><FormattedMessage id='messageCenter' defaultMessage='消息中心'/></span>
                        </Badge>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mesList: bindActionCreators(mesList, dispatch),
        hmesList: bindActionCreators(hmesList, dispatch),
    }
}

SideMenu = connect(mapStateToProps, mapDispatchToProps)(SideMenu);
export default SideMenu;