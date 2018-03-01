import React from 'react';
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;



class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '1'
        }

    }
    handleClick(e){
        //console.log('click ', e);
        this.setState({
            current: e.key,
        });
        this.props.page(e)
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
                        <Icon type="pie-chart" />
                        <span>基础资料</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="idcard" />
                        <span>初级认证</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="safety" />
                        <span>高级认证</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="team" />
                        <span>联系人</span>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default SideMenu;