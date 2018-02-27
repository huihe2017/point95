import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'短线交易需注意的事项：',
        content:[
            '第一，头脑要清醒，不要选择在心情不好的时候做。',
            '第二，略懂技术分析，三分靠本事，七分靠感觉。那要学些什么呢？不同周期线图，会画趋势线，会用短期平均线，如是而已。其他就是看看市场指数，听听基本面消息，凭感觉从事。',
            '第三，行情比较混乱，不管时间长短，绝不交易。',
            '第四，短线交易不是天天交易。',
            '第五，短线交易并是意味为着就是操底杀顶，要结合趋势来做，尽量克制自己不做逆势单。这是最重要的一条！'
        ]
    },{
        title:'怎么做短线交易：',
        content:[
            '短线交易的交易策略有很多种，几乎做外汇的每个交易者都有自己的一套短线交易方法，在此仅介绍下方法，大家可参考着，结合自己的偏好建立一套自己的短线交易系统。'
        ]
    }

]

class SkillEleven extends React.Component {
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
                        <Title content="/外汇交易中的短线交易" color="#5262ff" big={true} bold={true}/>
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

SkillEleven = connect(mapStateToProps, mapDispatchToProps)(SkillEleven)
export default SkillEleven;