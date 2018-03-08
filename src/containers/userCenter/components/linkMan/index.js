import React from "react";
import style from "./index.css";
import qiniu from "qiniu";
import axios from  '../../../../common/axiosConf'
import { message } from 'antd';

class LinkMan extends React.Component{
    componentWillMount(){
        var that=this;

        //获取高级认证的资料
        axios.get('http://192.168.100.105:8000/seniorAuthMsg', {params:{
            token:localStorage.getItem('token')
        }}).then(function (response) {
            if(response.data.result["0"].seniorCertified==3){
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
        return(
            <div className={style.wlop} >
                {this.state.canChange?'联系人微信：lalala':'高级审核未通过'}

            </div>
        )
    }
}

export default LinkMan;