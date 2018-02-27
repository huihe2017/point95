import React from 'react';
import style from "./index.css"
import Title from '../../../../components/title/index'
import ContentList from '../../../../components/contentList/index'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'


class History extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className={style.aboutus}>
                <img className={style.img} src={require('./images/nodata.png')} alt=""/>
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

History = connect(mapStateToProps, mapDispatchToProps)(History)
export default History;