import React from 'react';
import style from "./index.css"
import Title from '../../../../../../components/title'
import ContentList from '../../../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


let data= [
    {
        title:'容易赔钱的交易时间',
        content:[
            '星期五：星期五的行情是最不好预测的。',
            '节假日：这个时候的成交量的非常的小，特别是美国和英国的节假日对市场的影响非常大，很多银行、机构投资者都没有参与交易。行情可能波动非常小，也有可能因为成交量小出现行情被放大的可能，汇价短期内暴涨或暴跌。所以叶很难把握。',
            '新闻、数据:在数据或新闻时间发布前，我们很难预测出价格的运动方向，如果在有把握相应方法之前贸然交易，结果可能令你痛苦不堪，如果你一定要交易，我建议你使用下面我将为你讲到的数据交易策略。'
        ]
    },{
        title:'交易时段选择',
        content:[
            '从事外汇交易最好是选择行情比较活跃的交易时段进行。外汇市场是北京时间16：00（夏令时是15：00）欧洲开市至1：00（夏令时是0：00）相对比较活跃，在这期间有欧洲和美国许多中要数据公布和新闻事件发生，是行情波动最大，参与交易者最多的交易时段，也是最好的交易时段。 对于中国人来说，即使由于工作不能抓住下午的交易，也可以在欧美重叠的时段进行交易。 当然如果工作特殊，只能在不活跃交易时段交易，你必须同样坚守纪律，专心研究市场在这些特殊时段的运作规律。'
        ]
    }

]

class SkillEight extends React.Component {
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
                        <Title content="/外汇交易时间选择" color="#5262ff" big={true} bold={true}/>
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

SkillEight = connect(mapStateToProps, mapDispatchToProps)(SkillEight)
export default SkillEight;