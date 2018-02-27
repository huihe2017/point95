import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'投资技巧',
        content:[
            '先看日线定主趋势方向。如果日线趋势明确，并且规范，风险较小打开4小时图看看是否适合进场，然后在打开1小时图是否适合进场。当日线规范，4小时图适合进场，1小时图适合进场，三个条件满足时就可以进场了。设置好止损位。确定好持单的周期，短期但一定设置止盈。中长线单一定要将止损位置随时跟进。',
            '怎样判断持单周期：1.看K线运行角度，一般K线运行角度大于45度时可以中长线持单，一般K线行情运行角度小于45度时，短线持单，并在入场时设置好止盈。运行角度大代表动能强劲，运行角度小代表动能较弱，方向不明，行情容易反复。在判断行情方向时坚持右侧交易思想，等待日线走势已经确定再入场。',
            '右侧交易思想应用于判断行情方向，而挂单交易法、小周期右侧交易及逐步加减仓法主要应用于交易入场和出场。在日线或周线(主趋势)面临重要压力位和支撑位时，不要交易，震荡行情不好做。不要去猜测日线行情会不会转折、触底，日线只用来看趋势，不用来做交易。',
            '图形周期越长其指标的压力与支撑的力度越强，行情方向越不容易改变。当行情附近面临两个指标的压力位或者支撑位时，以距离行情最远的那个指标为准，远的比近的指标安全一些。一个好的交易位置(入场或者出场位置)与判断行情方向一样重要。注意不同时间周期图形之间的转换和结合。',
            '技术分析的前提是，市场永远是。基本面分析的前提是，市场永远是错的。挂单交易时，位置一定要远，宁可单子不成，挂单交易挂的是小概率。判断行情趋势的周期是：日线和周线。在 MT4中转换交易周期。一般包括15分、30分、1H、4H。',
            '在交易前或者下单之后问问自己，为什么行情在上涨我要下空单？为什么行情在下跌我要下多单？难道我不能等到行情稳定时在入场吗？我做这单交易的理由是什么？我要交易的这单打算什么时间止盈或者止损，周期是长线还是短线，是1天还是1小时。'
        ]
    },{
        title:'交易时段选择',
        content:[
            '从事外汇交易最好是选择行情比较活跃的交易时段进行。外汇市场是北京时间16：00（夏令时是15：00）欧洲开市至1：00（夏令时是0：00）相对比较活跃，在这期间有欧洲和美国许多中要数据公布和新闻事件发生，是行情波动最大，参与交易者最多的交易时段，也是最好的交易时段。 对于中国人来说，即使由于工作不能抓住下午的交易，也可以在欧美重叠的时段进行交易。 当然如果工作特殊，只能在不活跃交易时段交易，你必须同样坚守纪律，专心研究市场在这些特殊时段的运作规律。'
        ]
    }

]

class SkillNine extends React.Component {
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
                        <Title content="/外汇交易者投资技巧" color="#5262ff" big={true} bold={true}/>
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

SkillNine = connect(mapStateToProps, mapDispatchToProps)(SkillNine)
export default SkillNine;