import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'如何扭亏为盈',
        content:[
            '贸易资金的流动。一般指出口商、进口商在买卖商品中发生的资金流动。',
            '银行资金的流动。一方面，银行由于业务的需要，如套汇、套利、多空头寸抵补、头寸调拨等；另一方面还表现在各国央行对本国或者它国货币过度上升或下跌时，在外汇市场上干预而动用的资金。如今年1月初，日本央行为了防止日元汇率升值突破100大关，在1美元兑102日元附近，大量抛售日元。以致于日元在2月22日跌至今年最低点1美元兑111.73日元，日元跌幅近10％。',
            '保值资金的流动。这部分资金的流动表现在：避险资金；由于某国、某地区政局动荡不稳，引起资金外流，图求安全。如去年欧洲地区的科索沃危机，促发这部分资金大肆抛售欧元。这也是引起欧元走弱的因素之一。货币保值资金；这部分资金一般投资于高息货币，即资金从低利率货币流入高利率货币，高息货币将受市场的青睐和追捧，如美元、英镑等。同时某国的国际收支、财政政策等好坏都会引起这部分资金的流动。',
            '投机资金的流动。这部分资金的流动对货币的汇率波动具有巨大的影响，也是流动频率最快的。如1998年10月7日上午东京盘上日元汇率为1美元兑128日元，然而在当天晚上的欧洲市场上，日元最高升至1美元兑111.70日元，单天升幅近13％。'
        ]
    },{
        title:'投资者如何把握国际主流资金的动向呢?',
        content:[
            '要了解各种相关的国际金融市场、投资市场的情况。如股市：包括美国的道?琼斯指数、纳斯达克指数、香港的恒生指数、日本的日经指数等等。世界主要国家的债券市场、黄金、石油价格，以及相关的商品、期货市场等。',
            '要把握各市场之间的资金流动。如国际股市与汇市之间的资金流动。',
            '要有辨别国际主、次流资金流动的能力。',
            '要有一定的分析工具(分析软件)作为基础。如技术走势图、市场即时消息、即时汇市行情、以及有关的经济数据。'
        ]
    }

]

class SkillSeven extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className={style.aboutus}>

                <div className={style.wlop}>
                    <div className={style.header}>
                        <Title content="/外汇交易扭亏为盈是如何做到的" color="#5262ff" big={true} bold={true}/>
                    </div>
                    <div className={style.content}>
                        <ContentList data={data}/>
                    </div>
                </div>

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

SkillSeven = connect(mapStateToProps, mapDispatchToProps)(SkillSeven)
export default SkillSeven;