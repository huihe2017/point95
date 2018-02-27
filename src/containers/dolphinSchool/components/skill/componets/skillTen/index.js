import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'背离交易：',
        content:[
            '外汇常见背离主要有两种：第一种是价格与指标的背离（振荡指标、趋势指标等）；第二种是技术面与基本面的背离，比如价格走势与基本面的背离。这里主要说的是汇价与指标间的背离。'
        ]
    },{
        title:'汇价与指标间背离的类型：',
        content:[
            '一个正常的背离被看作一个趋势翻转的可能信号。如果汇价创出更低低点，而指标却逐步抬高，那么就是通常情况下的看涨背离，也就是看涨底背离。相反，如果汇价创出更高高点，而指标却创新低，那么就是通常情况下的看跌背离，也就是看跌顶背离。',
            '隐含背离：一个隐含的背离通常被看作是趋势可能持续性较大的信号。如果汇价创出更高低点， 指标却创新低，那么就是通常情况下的看涨隐含背离，也就是隐含看涨底背离。相反，如果汇价创出更低高点，而指标却创新高，那么就是通常情况下的看跌隐含背离，也就是隐含看跌顶背离。 同样还是刚才那个图，我们可以从图中看到汇价创出更高地低点，而KDJ却创更低低点，出现隐含看涨底背离'
        ]
    },{
        title:'交易背离的方法：',
        content:[]

    }

]

class SkillTen extends React.Component {
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
                        <Title content="/外汇交易中的背离交易" color="#5262ff" big={true} bold={true}/>
                    </div>
                    <div className={style.content}>
                        <ContentList data={data}/>
                        <table className={style.table}>
                            <thead>
                                <tr className={style.tr}>
                                    <td>背离类型</td>
                                    <td>价格类型</td>
                                    <td>指导运动</td>
                                    <td className={style.fb}>交易方向</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>正常顶背离</td>
                                    <td>价格创新高</td>
                                    <td>指标高点下降</td>
                                    <td className={style.fb}>卖出</td>
                                </tr><tr>
                                    <td>正常顶背离</td>
                                    <td>价格创新低</td>
                                    <td>指标低点上升</td>
                                    <td className={style.fb}>买进</td>
                                </tr><tr>
                                    <td>隐含顶背离</td>
                                    <td>价格低点上升</td>
                                    <td>指标创新低</td>
                                    <td className={style.fb}>买进</td>
                                </tr>
                                <tr>
                                    <td className={style.b}>隐含顶背离</td>
                                    <td className={style.b}>价格高点下降</td>
                                    <td className={style.b}>指标创新高</td>
                                    <td className={style.bb}>卖出</td>
                                </tr>
                            </tbody>
                        </table>
                        <ul className={style.list}>
                            <li className={style.item}>
                                <p>
                                    背离就像以个早期的预警信号，告诉你市场转向的时机。这里你要注意的是，背离只是以个信号，而非建仓的充分条件，i还需要结合其他不同类型的指标、形态进行交叉验证和信号过滤。
                                </p>
                            </li>
                        </ul>
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

SkillTen = connect(mapStateToProps, mapDispatchToProps)(SkillTen)
export default SkillTen;