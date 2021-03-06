import React from "react";
import style from "./index.css";
import qiniu from "qiniu";
import axios from  '../../../../common/axiosConf'
import webLink from  '../../../../common/webLink'
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';
import { message } from 'antd';

class LinkMan extends React.Component{
    componentWillMount(){
        var that=this;

        //获取高级认证的资料
        axios.get(`${webLink}/primaryAuthMsg`, {params:{
            token:localStorage.getItem('token')
        }}).then(function (response) {
            if(response.data.result["0"].primaryCertified==3){
                that.setState({
                    canChange:true
                })
            }
            if (response.data.code === 0) {
                message.error(response.data.message);
            }
        }).catch(function (error) {
            console.log(error);
        })

        //获取七牛的token
        var accessKey = 'BzN7Apb-vCMmeNYqM720qePENoBDsSVKfn-tuoxC';
        var secretKey = 'a96qIIB0PP6A3GEvs0VjMoznuO-j2QCfSx_aRXNU';
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var putPolicy = new qiniu.rs.PutPolicy({
            scope: "point-95",
        });
        var uploadToken=putPolicy.uploadToken(mac);
        that.setState({
            token: uploadToken
        })

    }
    render(){
        const { intl: { formatMessage } } = this.props
        const basicCant = formatMessage({id:'basicCant'});
        const RMwechat = formatMessage({id:'RMwechat'});
        return(
            <div className={style.wlop} >
                {this.state.canChange?`${RMwechat}：fuchina888`:basicCant}

            </div>
        )
    }
}

export default injectIntl(LinkMan);