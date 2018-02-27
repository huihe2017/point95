import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'顺势建仓原则',
        content:[
            '涨势从来不会因为涨幅太大而不能继续上涨，跌势也从来不会因为跌幅太大而拒绝继续下跌。趋势最大的特征就是延续性，顺势建仓是风险相对最小的建仓方式。','入场：任何时候都谨慎入场，即便是顺势操作同样要有依据地交易，且都要严格地控制风险。','持仓：趋势没有改变信号，坚定持有信心。','赢利：跟随趋势，不断提高止损，不预判高点，才能把握到趋势的延续性。'
        ]
    },{
        title:'逆势建仓原则',
        content:[
            '逆势建仓时，特别忌讳贪便宜，任何情况下都不因为跌幅已经特别大了而作为建仓的理由。而且要注意：小级别的逆势交易不做。',
            '控制是逆势交易第一要务，防止出现难以弥补的损失',
            '放弃。反弹机会也总会出现，但很多反弹是不适合交易的：小级别反弹、无力度的反弹、第一波反弹。这些机会都是显著的大风险机会。',
            '趋势确认发生扭转之前，逆势交易一定要快进快出，不可恋战。',
            '无依据逆势交易。顺势交易有的时候甚至可以是无依据的，只要能控制好风险就行，而在逆市交易中，即便是能控制好风险，也不要无依据交易。'
        ]
    }

]

class SkillOne extends React.Component {
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
                        <Title content="/外汇的建仓原则" color="#5262ff" big={true} bold={true}/>
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

SkillOne = connect(mapStateToProps, mapDispatchToProps)(SkillOne)
export default SkillOne;