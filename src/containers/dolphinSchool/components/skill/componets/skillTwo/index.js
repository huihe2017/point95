import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'总仓位控制规则（总仓位控制中，已经盈利的仓位并锁定风险在零的仓位可不计算在内。）',
        content:[
            '顺势交易 我们将仓位分为轻仓、中仓、重仓三种方式，那么在顺势交易当中，可保留中仓作为顺应市场趋势的仓位，其它仓位作为流动性仓位。具体的划分可根据投资者的个人喜好来调整，重视短线操作的可将流动性仓位增大，重视中线操作的可将流动性仓位缩小。',
            '逆势交易 逆势交易中的仓位控制更重要，大多数情况下都只能采取轻仓的操作，对于已经非常成熟的、成功率很高的交易规则，可适当扩大仓位到中仓；逆势交易中，除非方向发生明确扭转，否则无重仓操作机会。',
            '横盘势交易 盘整市仓位控制较为严格，在盘整区域被突破之前，不可重仓操作，突破之后可逐渐加大仓位。'
        ]
    },{
        title:'加仓规则',
        content:[
            '加仓的方法 等额分配加仓:即每次建立头寸，仓位分配一致，不做增加也不做减少。 金字塔加仓:即每次建立头寸，都小于上一次已经建立的头寸的仓位（未平仓时）。这种情况往往用在顺势加仓。 倒金字塔加仓:即每次建立头寸，都大于上一次已经建立的头寸的仓位（未平仓时）。经过几年时间与数万汇民的交流，我深知这第三种加仓方式是很多投资者常用的方式，在这里要特别提醒大家这种方式建议投资者一定慎用。',
            '不同趋势下的使用顺势交易:主要采用等额分配加仓、金字塔加仓方式；在计划内的多次建仓，可有依据地采用倒金字塔加仓。 逆市交易:短线交易，不采用任何加仓方式，仅一次性建仓；中线交易，可根据短线顺势交易适当加仓，但加仓方式只能采用金字塔加仓。 横盘势交易:横盘区间突破之前，不采用任何加仓方式，仅一次性建仓；横盘区间突破后，可采用等额分配加仓、倒金字塔加仓方式。'
        ]
    }

]

class SkillTwo extends React.Component {
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
                        <Title content="/外汇仓位应如何控制" color="#5262ff" big={true} bold={true}/>
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

SkillTwo = connect(mapStateToProps, mapDispatchToProps)(SkillTwo)
export default SkillTwo;