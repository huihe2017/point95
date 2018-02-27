import React from 'react';
import style from "./index.css"
import Title from '../title/index'
import ContentList from '../contentList/index'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import { Breadcrumb } from 'antd';


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
                <span>当前位置：</span>
                <div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item href="#/">首页</Breadcrumb.Item>

                        {
                            this.props.position.map((v)=>{
                                console.log(v.herf)
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