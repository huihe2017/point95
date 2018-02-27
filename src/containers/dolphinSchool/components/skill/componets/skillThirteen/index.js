import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'止损的必要性：',
        content:[
            '世界上最伟大的交易员有一个有用且简单的交易法则——“鳄鱼原则”。该法则源于鳄鱼的吞噬方式：猎物越试图挣扎，鳄鱼的收获越多。假定一只鳄鱼咬住你的脚，如果你用手臂试图挣脱脚，则它的嘴巴便会同时咬你的脚与手臂。你越挣扎，便陷得越深。所以，万一鳄鱼咬住你的脚，务必记住：你惟一的生存机会便是牺牲一只脚。若以外汇市场的语言表达，这项原则就是：当你知道自己犯了错误时，立即了结出场！不可再找借口、理由或有所期待，赶紧离场。'
        ]
    },{
        title:'如何设置止损',
        content:[
            '点数止损设置法，如30点、40点、50点等，根据不同的交易周期选择合适的点数。短线交易最好选择30点左右的止损，中长线交易止损也应保持在100点以内。',
            '最近的高低点来设置止损位，一般选择在高点上方10—20点或低点下方10—20点。',
            '技术指标的阻力、支撑位设置，主要有：均线、趋势线、黄金分割。',
            'K线形态设置参照物，主要有：趋势线的切线；头肩顶或圆弧顶等头部形态的颈线位；通道的上下轨；缺口的边缘。',
            '汇价的整数价位,主要是因为整数关价位对投资大众的心理有一定支撑和阻力作用。'
        ]
    }

]

class SkillThirteen extends React.Component {
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
                        <Title content="/外汇如何设置止损" color="#5262ff" big={true} bold={true}/>
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

SkillThirteen = connect(mapStateToProps, mapDispatchToProps)(SkillThirteen)
export default SkillThirteen;