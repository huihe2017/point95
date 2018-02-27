import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import axios from '../../common/axiosConf'
import {Input, Button, Row, Col} from 'antd';
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';

class Countdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            extraText: '获取验证码',
            counting: false,
            type:1
        }
    }

    handle = () => {
        if (this.props.beforeClick()) {
            if (this.state.counting) {
                return false
            }

            let _this = this
            axios.post('http://47.91.236.245:4030/user/sms-captcha', {
                business: this.props.business,
                image_captcha: this.props.picCode,
                phone: this.props.phone
            }).then(function (response) {
                console.log(response);
                if (response.data.code === 0) {
                    _this.setState({counting: true})
                    let seconds = 60
                    _this.inter = setInterval(() => {

                        _this.setState({extraText: (seconds--) + 's'}, () => {
                            if (_this.state.extraText === '-1s') {
                                clearInterval(_this.inter)
                                _this.setState({extraText: '重新发送'})
                                _this.setState({counting: false})
                            }
                        })

                    }, 1000)
                } else {
                    // Toast.fail(response.data.msg, 3, null, false)
                    Toast.info(response.data.msg, 3, null, false)
                    _this.props.failCallback()
                }
            })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    render() {
        const bigrow='18';

        return (
            <Row >
                <Col span={this.props.type=='big'?18:15}>

                    <Input onChange={this.props.onChange} className={style.inputyz} placeholder="短信验证码"/>

                </Col>
                <Col span={this.props.type=='big'?6:9}>
                    <Button onClick={this.handle} className={this.props.className}
                            style={{height: 40, width:this.props.type=='big'? 110:100, marginLeft: 20}}>{this.state.extraText}</Button>
                </Col>
            </Row>
        )

    }


}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

Countdown = connect(mapStateToProps, mapDispatchToProps)(Countdown)


export default Countdown;