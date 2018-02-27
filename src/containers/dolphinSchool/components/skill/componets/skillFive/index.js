import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'数据新闻行情交易',
        content:[
            '我们知道全球每个星期都会有一些非常重大的数据公布或新闻事件发生，对于由这些数据和新闻事件引起的行情剧烈波动，事前我们是无法预测方向的，这个时候千万不要抱着赌的心理轻易进场。 此外一般数据和新闻事件公布后，行情剧烈波动，手动下单很难成交。 这里我为大家介绍以个简单而行之有效的交易策略：挂单交易。 挂单交易分为四种：买进限价（buy limit）、买进止损（buy stop）、卖出限价（sell limit）、卖出止损（sell stop）。'
        ]
    },{
        title:'突发事件的应对',
        content:[
            '外汇操作中，突发事件是一个不能忽视的因素。 突发事件包含的内容很多，从政治面、军事面到经济面，无所不包，当遭遇突发事件时，最重要的就是临危不乱，不要因为盘面的剧烈波动，而影响了操作心态。此时如果是空仓，切忌追涨杀跌，如果有仓未能在第一时间平仓被套，也要保持头脑的冷静，不要在慌张中平仓，因为慌不择路所平掉的仓位，都属于恐慌盘，恐慌盘往往只会触发短线行情，对中线走势意义不大。 对突发事件之后的行情判断，应追本溯源，了解到底发生了什么突发事件，这一事件的意义何在，从而判断今后的走势。突发事件可以分为两类，一类是只有短线影响，无碍中长线走势的突发事件；一类是能够改变中线走势，具有拐点意义的突发事件，多数突发事件属于前者。'
        ]
    }

]

class SkillFive extends React.Component {
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
                        <Title content="/外汇的数据新闻行情交易和突发事件如何应对" color="#5262ff" big={true} bold={true}/>
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

SkillFive = connect(mapStateToProps, mapDispatchToProps)(SkillFive)
export default SkillFive;