import React from 'react';
import style from "./index.css"
import Title from '../../../../components/title'
import ContentList from '../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'




class MoneyFlow extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className={style.wlop}>
                <div className={style.header}>
                    <Title content="/暂无" color="#5262ff" big={true} bold={true}/>
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

MoneyFlow = connect(mapStateToProps, mapDispatchToProps)(MoneyFlow)
export default MoneyFlow;