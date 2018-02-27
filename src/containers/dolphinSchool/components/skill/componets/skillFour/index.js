import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'平仓原则',
        content:[
            '作为顺势交易的平仓信号，主要采用道氏理论、通道、波浪分析、k线、k线组合、均线、macd等指标信号。 注意：顺势交易的离场信号，也要求有多个信号验证，才作为离场信号；而逆势交易中，一个可靠的信号发出就可作为离场信号。 例如：通道平仓信号的运用：通道产生的阻力，往往看作离场信号，但也要区分中线和短线的概念，并不一定都是平仓信号。 例如：上升趋势中，上升通道的上沿，在顺势交易中，不一定作为平仓信号，只是作为不继续建立多单的警示。最后，当通道发生逆向突破的时候，看作是顺势交易的准确离场信号。'
        ]
    },{
        title:'注意事项',
        content:[
            '分析方法产生的离场信号，最好是同级别的信号。比如小时图信号顺势做多，那么离场信号也应该来自于小时图或者更高的时间级别图形，而不能采用30分钟图以下的离场信号。在顺势持仓的过程中，如果出现了同级别的逆市建仓的规则信号，则需要对顺势仓位进行离场或者减仓操作，或者将止损进一步跟进到很近的支撑位置。也可在中线交易中，将止损按照短线来设置，达到尽量保护头寸的目的。 当逆势交易中，如果已经发出了顺势交易信号，则逆势单必须离场，此时的离场信号等同于顺势交易的入场规则。'
        ]
    }

]

class SkillFour extends React.Component {
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
                        <Title content="/外汇的平仓原则" color="#5262ff" big={true} bold={true}/>
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

SkillFour = connect(mapStateToProps, mapDispatchToProps)(SkillFour)
export default SkillFour;