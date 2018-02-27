import React, {Component} from 'react';
import classnames from 'classnames';
import style from './index.css';

class Model extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            msg: "",
            timer: 0,
            className: "",
        };
        this.show = this.show.bind(this);
    }

    show(opt) {
        let {type, typeStatus, msg, duration} = opt;
        console.log("gageg",opt)
        let time = null;
        const {timer} = this.state;
        clearTimeout(timer);
        duration = duration || 1500;

        let _self = this;
        if (type != "loading" || (type == "loading" && typeStatus == 2)) {
            time = setTimeout(() => {
                _self.setState({
                    className: style.toastEnter,
                });
                setTimeout(() => {
                    let cls = this.state.className;
                    if (cls.match(style.toastEnter)) {
                        _self.setState({
                            className: style.toastEnter + ' ' + style.toastOut
                        });
                    }
                }, 500);
            }, type != "loading" ? duration : 1);
        }

        this.setState({
            type: type,
            msg: msg,
            timer: time,
            className: "",
        });
    }

    render() {
        let toastContent = "";
        if (this.state.type == "msg") {
            toastContent = this.state.msg;
        } else if (this.state.type == "loading") {
            toastContent =
                <div className={style.toastInnerBox}>
                    <div className={style.toastLoadingImg}>

                    </div>
                    <div className={style.toastInnerText}>
                        {this.state.msg}
                    </div>
                </div>
            ;
        } else if (this.state.type == "success") {
            let successIcon = require('./Img/successToast.png');
            toastContent =
                <div className={style.toastInnerBox}>
                    <div className={style.toastInnerImg}>
                        <img src={successIcon} alt=""/>
                    </div>
                    <div className={style.toastInnerText}>
                        {this.state.msg}
                    </div>
                </div>
            ;
        } else if (this.state.type == "fail") {
            let failIcon = require('./Img/failToast.png');
            toastContent =
                <div className={style.toastInnerBox}>
                    <div className={style.toastInnerImg}>
                        <img src={failIcon} alt=""/>
                    </div>
                    <div className={style.toastInnerText}>
                        {this.state.msg}
                    </div>
                </div>
            ;
        } else if (this.state.type == "offline") {
            let offlineIcon = require('./Img/offlineToast.png');
            toastContent =
                <div className={style.toastInnerBox}>
                    <div className={style.toastInnerImg}>
                        <img src={offlineIcon} alt=""/>
                    </div>
                    <div className={style.toastInnerText}>
                        {this.state.msg}
                    </div>
                </div>
            ;
        }
        return (
            <div
                className={
                    classnames({
                        [style.toastInit]: this.state.msg == "",
                        [style.toastBox]: true,
                        [style.toastOut]: this.state.className.match(style.toastOut),
                    })
                }
            >
                <div
                    className={
                        classnames({
                            [style.toastContent]: true,
                            [style.toastEnter]: this.state.className.match(style.toastEnter),
                        })
                    }
                    style={{
                        padding: this.state.msg != "" ? "10px" : "0"
                    }}
                >
                    {toastContent}
                </div>
            </div>
        );
    }
}

export default Model;
