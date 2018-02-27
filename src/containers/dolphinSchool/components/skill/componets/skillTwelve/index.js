import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'区间交易：',
        content:[
            '区间交易的假设是，不管汇价往哪个方向走动，很大可能它将返回到原点。事实上，区间交易者打赌汇价可能会在同一水平上交易多次，因此尽可能收集走势震荡曲折点就尤其显得重要。 区间交易是一个简单的概念，即在支持位买入和在阻力位卖出而获利。当找到主要支持和阻力位时，区间交易者会在支持位低点买入货币对，然后在汇价接近阻力位时卖出。投资者可能会重复此程序多次，直到汇价突破区间。区间交易者遵守的原则是逢低买入，逢高卖出。 当汇价在通道内持续几周，乃至几个月区间交易，这个交易策略就是一个有效获利的策略。 一个价格跨度足够大的水平区间，在接近于区间底部买进，在接近于区间顶部卖出，反复操作，可以称之为区间交易的理想状态。'
        ]
    },{
        title:'注意事项：',
        content:[
            '首先需要有一定的盈利空间，盈利空间太小，不做；其次区间需要多次高点和低点确认，高点和地点至少要测试两次；再次汇价有效突破区间时坚决离场。'
        ]
    }

]

class SkillTwelve extends React.Component {
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
                        <Title content="/外汇交易中的区间交易" color="#5262ff" big={true} bold={true}/>
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

SkillTwelve = connect(mapStateToProps, mapDispatchToProps)(SkillTwelve)
export default SkillTwelve;