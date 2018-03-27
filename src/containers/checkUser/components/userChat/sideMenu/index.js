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
            current: '1',
            userData:[]
        }
    }
    handleClick(e){
    // console.log(e)
        this.setState({
            current: e.key,
        });
        this.props.page(e)
    }
    componentWillMount(){

        let that=this
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



    datalist(){
        console.log(1111,this.state.userData);
        // for(var i in this.state.userData){
        //     // console.log(this.state.userData[i]);
        //
        //     // return(<Menu.Item key={i}>
        //     //     <span className={style.titword}>
        //     //         {this.state.userData[i].id.email}
        //     //     </span>
        //     // </Menu.Item>)
        //
        //     this.data(this.state.userData[i],i)
        // }
        // this.state.userData.map((value,index)=>{
        //     return(<Menu.Item key={index}>
        //              <span className={style.titword}>
        //                  {value.id.email}
        //              </span>
        //          </Menu.Item>)
        // })
[1,1,1,1].map((a,b)=>{
    return(<Menu.Item key={a}>
                     <span className={style.titword}>
                         {"ehwh"}
                     </span>
    </Menu.Item>)
})



    }

    render() {
        // console.log(this.state.userdata);
        return (
            <div style={{ width: 400 }}>

                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    onClick={this.handleClick.bind(this)}
                    selectedKeys={[this.state.current]}
                >

                    {this.datalist()}

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