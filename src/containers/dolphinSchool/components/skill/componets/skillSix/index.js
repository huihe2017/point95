import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'交易实战技巧：',
        content:[
            '超级短线交易（1分钟/5分钟图）。掌握分钟来判断，进单以超级短线为主，而每天交易频率非常高，可能会达到几十次到上百次。从事炒汇超级短线的人都在最短的时间抓到最快的利润，短、平、快的方式来操作单子。而你在看他交易的速度非常快，所以这种方式操作反映速度和思维要比较敏捷才可以。',
            '短线交易（15分钟/30分钟）。可以把握30分钟内走势来操作，一次也有几十点利润可以拿到。而相对炒汇超级短线把握单子的时间会长线，利润上也是几十点左右。这种交易方式市场使用的人数最多，而能做到的人也有限，所以短线高手要把握很快节奏的交易频率。往往这种交易方式也是使用的人最多。',
            '无论是哪种交易方式，都要求外汇保证金投资者对于外汇市场能够有一个直观清晰的认识，只有这样才能够在复杂的行情之中迅速而准确的把握住自己想要交易机会。'
        ]
    }

]

class SkillSix extends React.Component {
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
                        <Title content="/外汇短线交易实战技巧" color="#5262ff" big={true} bold={true}/>
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

SkillSix = connect(mapStateToProps, mapDispatchToProps)(SkillSix)
export default SkillSix;