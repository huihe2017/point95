import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'宏观纪律',
        content:[
            '出现连续3次亏损，则应强制自己休息下，不盲目交易，分析下自己发生亏损的原因，调整好心态再寻找机会入场。',
            '连续交易获利超过50%，则强制休息下。',
            '每日交易不要过于频繁。',
            '交易止损后，不在3小时内进行逆向交易。'
        ]
    },{
        title:'入场前纪律',
        content:[
            '寂静的时候不进场。',
            '尽量做趋势明朗的币种，不做趋势不明朗的币种。',
            '做多的时候，只做强势币种，不做弱势币种；做空的时候，只做弱势币种，不做强势币种。',
            '交易，都至少包含入场价、止损价、目标价、仓位控制4个基本要素。',
            '震荡市，当震荡幅度较小时，震荡区间内不交易。'
        ]
    },{
        title:'入场后纪律',
        content:[
            '短线头寸盈利超过30点，则第一时间将止损提到成本价附近。',
            '执行同一时间级别的交易计划。比如依据小时图所做的操作，不单独因为30分钟图出现的短线不良迹象而贸然改变计划。主动离场的必须有明确的规则，也就是明确的平仓规则。',
            '逆势单入场后，如果出现亏损，不因任何信号变更为中线头寸。短线逆势交易头寸，尽量不要持仓过夜。'
        ]
    }

]

class SkillThree extends React.Component {
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
                        <Title content="/外汇的交易纪律" color="#5262ff" big={true} bold={true}/>
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

SkillThree = connect(mapStateToProps, mapDispatchToProps)(SkillThree)
export default SkillThree;