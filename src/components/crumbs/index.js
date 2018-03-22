import React from 'react';
import style from "./index.css"
import Title from '../title/index'
import ContentList from '../contentList/index'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import { Breadcrumb } from 'antd';
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';

class Crumb extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className={style.wrap}>
                <span><FormattedMessage id='location' defaultMessage='当前位置'/>：</span>
                <div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item href="#/"><FormattedMessage id='home' defaultMessage='首页'/></Breadcrumb.Item>

                        {
                            this.props.position.map((v)=>{
                                return (
                                    <Breadcrumb.Item href={v.href}>{v.pos}</Breadcrumb.Item>
                                )
                            })
                        }

                    </Breadcrumb>
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

Crumb = connect(mapStateToProps, mapDispatchToProps)(Crumb)
export default Crumb;