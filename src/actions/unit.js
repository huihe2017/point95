import axios from '../common/axiosConf';
import webLink from '../common/webLink';
import { hashHistory } from 'react-router';
import { message } from 'antd';
import Toast from 'antd-mobile/lib/toast';

//获取图形验证码
export function getCaption(data, callback) {
    return dispatch => {
        axios.get(`${webLink}/captcha`)
            .then(function(response){
                callback(response.data.result.txt)
            })
            .catch(function(err){
                console.log(err);
            });
    }
}

//获取短信验证码
export function getTelCaption(data, callback) {
    return dispatch => {
        axios.get(`${webLink}/telCaptcha`,{params: {
                business: this.props.business,
                captcha: this.props.picCode,
                tel: this.props.phone
            }})
            .then(function(response){
                callback(response.data)
            })
            .catch(function(err){
                console.log(err);
            });
    }
}