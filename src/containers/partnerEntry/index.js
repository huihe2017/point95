import React from 'react';
import style from "./index.css"
import { Button } from 'antd'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import ContentList from '../../components/contentList'
import Header from '../../components/header'
import Footer from '../../components/footer'
import ToolBar from '../../components/toolBar'
import Crumb from '../../components/crumbs'

let data= [
    {
        title:'IB合伙人：',
        content:['利润丰厚的返佣系统',
            '免费全方位合作伙伴培训',
            '自动真实账户注册情况跟踪',
            '强大的IB客户及佣金跟踪后台',
            '我们为IB提供多种返佣模式，还可以实现加点功能',
            'IB可以获得单独的真实账户注册链接，IB可以清楚了解其客户账户的申请、开通和存款状况'
        ]
    },{
        title:'白标计划：',
        content:[<p>海豚汇白标计划解决方案由我们的内部团队定制开发，专为希望拓展或提升其零售在线交易业务的金融机构提供服务。假如您目前已经拥有一定基础的客户群，那么我们的方案将极其适合您，帮您获得并保留更多客户，与此同时，使用我们高效的一站式Dolphin forex白标解决方案能提高整体利润率和控制性。<br/>
            我们专门的白标计划团队会在整个实施过程中亲自助君一臂之力，并且根据具体交易、风险和回报要求定制我们的白色标签方案。 您的私人白色标签账户经理会引导您完成实施步骤，直到达到预期增长，包括实施业务和营销策略、销售培训以及销售/客户支持。<br/>
            最大化您客户的收益，进而最大化您的利润</p>
        ]
    }
]

class PartnerEntry extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div className={style.partnerEntry}>
                <Header/>
                <Crumb position={[{pos:'合伙人计划'}]}/>
                <div className={style.toolbar}>
                    <ToolBar/>
                </div>
                <div className={style.wlop}>
                    <div className={style.parenimg}>
                </div>
                    <div className={style.parencon}>
                        <div className={style.lbut}>
                            <Link to="/partnerLogin">
                                <Button type="primary" ghost className={style.butt}>已有账户，立即登录</Button>
                            </Link>
                        </div>

                        <div className={style.rbut}>
                            <Link to="/partnerReg">
                                <Button type="primary" ghost className={style.butt}>注册成为合伙人</Button>
                            </Link>
                        </div>
                    </div>
                    <div className={style.conlist}>
                        <ContentList data={data}/></div>
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

PartnerEntry = connect(mapStateToProps, mapDispatchToProps)(PartnerEntry)
export default PartnerEntry;