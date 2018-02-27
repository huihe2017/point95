import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { Modal } from 'antd';
import {bindActionCreators} from 'redux'
import {hideAuth,showRegister,showResetPwd} from '../../actions/auth'


class QCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        }
    }
    hideModal = () => {

        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <div className={style.wrap}>
                <Modal
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.props.onClose}
                    okText="确认"
                    cancelText="取消"
                    width="400"
                >
                    <span className={style.qtitle}>
                        清扫描二维码进行开户
                    </span>
                    <div className={style.qcode}>
                        <img className={style.img} src={require('./images/'+ this.props.path +'.png')} alt=""/>
                    </div>

                </Modal>
            </div>
        )

    }
}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

QCode = connect(mapStateToProps, mapDispatchToProps)(QCode)


export default QCode;