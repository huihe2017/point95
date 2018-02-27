import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data1= [
    {
        title:'什么是套息交易：',
        content:[
            '不同货币基准利率不同，这就导致货币之间有息差，套息也就是套取两种货币之间的息差。注意：息差是无风险受益。 由于外汇保证金交易借助了比较高的杠杆，这就使得小资金也能进行套息交易。如我们借助100：1的杠杆，进行AUD/JPY套息交易：'
        ]
    }
]
let data2= [
    {
        title:'套息交易的准则：',
        content:[
            '首先：选择一个利息差异大的货币对 其次：第一个条件前提下，选择出在明显趋势中的货币对，这样既可以从中获取息差，还可以从汇率的变动中赚取差价。'
        ]
    }
]

class SkillFourteen extends React.Component {
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
                        <Title content="/外汇交易中的套息交易" color="#5262ff" big={true} bold={true}/>
                    </div>
                    <div className={style.content}>
                        <ContentList data={data1}/>
                        <div className={style.contenthua}>
                            <div className={style.leftcir}>
                                买CDA
                            </div>
                            <div className={style.contentcen}>
                                做多CDA/AUD从CDA上赚取百分之2利息，支付AUD百分之0.2得利息，净赚百分之1.8的息差
                            </div>
                            <div className={style.rightcir}>
                                卖AUD
                            </div>
                        </div>
                        <ContentList data={data2}/>
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

SkillFourteen = connect(mapStateToProps, mapDispatchToProps)(SkillFourteen)
export default SkillFourteen;