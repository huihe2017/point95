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
            current: '0',

        }
    }
    handleClick(e){
        this.setState({
            current: e.key,
        });
        this.props.page(e)
    }

    shouldComponentUpdate(pp){
        console.log(565656,pp)
        return true
    }

    render() {
        // if(this.props.active){
        //     this.setState({
        //         current: '0',
        //     });
        // }
        return (
            <div style={{ width: 400 }}>

                <Menu
                    defaultSelectedKeys={['0']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    onClick={this.handleClick.bind(this)}
                    selectedKeys={[this.state.current]}
                >
                    {
                        this.props.userData&&this.props.userData.map((v,i)=>{
                           // console.log(159,v);
                           return <Menu.Item message={v.messages} email={v.id.email} id={v.id._id} key={i}>
                <span className={style.titword}>
                     {v.id.email}
                </span>
                                </Menu.Item>
                            }
                        )

                    }

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