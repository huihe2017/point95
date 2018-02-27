import React from 'react';
import style from "./index.css"
import Title from '../../components/title'
import ContentList from '../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import Header from '../../components/header'
import Footer from '../../components/footer'
import {Input, Form, Tabs, Icon} from 'antd'
import Knowledge from './components/knowledge'
import Skill from './components/skill'
import Question from './components/question'
import AccountFlow from './components/accountFlow'
import MoneyFlow from './components/moneyFlow'
import ToolBar from '../../components/toolBar'
import Crumb from '../../components/crumbs'


const TabPane = Tabs.TabPane;

class DolphinSchool extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {
            tabsActiveKey: "1"
        }
    }

    render() {
        return(
            <div className={style.aboutus}>
                <Header/>
                <Crumb position={[{pos:'海豚学院'}]}/>
                <div className={style.toolbar}>
                    <ToolBar/>
                </div>
                <div className={style.wlop}>
                    <Tabs activeKey={this.state.tabsActiveKey} onChange={(e) => {
                        this.setState({tabsActiveKey: e})
                    }} type="card">
                        <TabPane tab={<span style={{display: 'block', width: 240}}>基础知识</span>} key="1">
                            <Knowledge/>
                        </TabPane>
                        <TabPane tab={<span style={{display: 'block', width: 240}}>交易技巧</span>}
                                 key="2">
                            <Skill/>
                        </TabPane>
                        <TabPane tab={<span style={{display: 'block', width: 240}}>常见问题</span>} key="3">
                            <Question/>
                        </TabPane>
                        <TabPane
                            tab={<span style={{display: 'block', width: 240}}>开户流程</span>}
                            key="4">
                            <AccountFlow/>
                        </TabPane>
                        <TabPane tab={<span style={{display: 'block', width: 240}}>出入金流程</span>} key="5">
                            <MoneyFlow/>
                        </TabPane>
                    </Tabs>
                </div>

                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

DolphinSchool = connect(mapStateToProps, mapDispatchToProps)(DolphinSchool)
export default DolphinSchool;