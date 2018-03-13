import React from 'react';
import style from "./index.css"
import Title from '../../components/title'
import ContentList from '../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import Header from '../../components/header'
import Footer from '../../components/footer'
import ToolBar from '../../components/toolBar'
import Crumb from '../../components/crumbs'

let data= [
    {
        title:'Dolphinforex：',
        content:['Dolphinforex隶属于Union Capital Market Limited 公司旗下，以创新网络营运模式经营，利用互联网构建一个完美的产品和服务体系，为投资人指引投资方向，是一家为零售及机构客户提供外汇交易及相关服务的主要环球供应商。','Dolphinforex对客户数据和交易纪录进行大数据分析挖掘潜在机会，让您的资金获得最有效的运用，在瞬息万变的全球经济环境中可快速调度资金调整投资组合，客户可以根据自身要求亲自制定更为贴身的投资组合。透过我们透明和先进的交易软件， 客户将可以直接获取来自国际银行系统的报价，为让客户获得高水准服务。','本集团核心创始成员全数出身于世界顶尖投资银行，对市场操作到客户需求都有很丰富的经验。','Dolphinforex受国际知名牌照机构监管。']
    }
]

class AboutUs extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div className={style.aboutus}>
                <Header/>
                <Crumb position={[{pos:'关于我们'}]}/>
                <div className={style.toolbar}>
                    <ToolBar/>
                </div>
                <div className={style.wlop}>
                    <div className={style.header}>
                        <Title content="/关于我们" color="#5262ff" big={true} bold={true}/>
                    </div>
                    <div className={style.content}>
                        <ContentList data={data}/>
                    </div>
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

AboutUs = connect(mapStateToProps, mapDispatchToProps)(AboutUs)
export default AboutUs;