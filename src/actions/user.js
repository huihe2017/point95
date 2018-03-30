import axios from '../common/axiosConf'
import webLink from '../common/webLink'
import { hashHistory } from 'react-router'
import { message } from 'antd';
import Toast from 'antd-mobile/lib/toast';
//登陆
export function login(data, callback) {
    return dispatch => {
        axios.post(`${webLink}/login`, {
            email: data.email,
            pwd: data.pwd,
            code: data.code
        })
            .then(function (response) {
                if (response.data.code === 1) {
                    console.log(response.data.result.unReadMsg);
                    dispatch({type: 'LOGIN', data: response.data.result})
                    dispatch({type: 'HIDE_AUTH'})
                    if(response.data.result.unReadMsg==1){
                        dispatch({type: 'HIDE_NUM'})
                    }else {
                        dispatch({type: 'SHOW_NUM'})
                    }
                    hashHistory.push('/')
                }else if (response.data.code === 0) {
                    //console.log(response.data.message)
                    Toast.hide()
                    message.error(data.language?response.data.message.en:response.data.message.zh);
                }
            })
            .catch(function (error) {
                message.error(data.language?"Internal Server Error":"网络错误");

            });
    }
}
//登出
export function logout(data, callback) {
    return dispatch => {
        dispatch({type: 'LOGOUT'})
        hashHistory.push('/')
    }
}
//
export function modifyPwd(data, callback) {
    return dispatch => {
        axios.patch('http://47.91.236.245:4030/user/customer/password', {
            old_password: data.initPwd,
            new_password: data.pwd
        })
            .then(function (response) {
                if (response.data.code === 0) {
                    // dispatch({type: 'MODIFYPWD'})
                    // callback()
                    console.log(response.data.message)
                    Toast.hide()
                    message.error(response.data.message);
                }else if (response.data.code === 1) {

                    console.log(response.data.message)
                    Toast.hide()
                    message.error(response.data.message);
                }
            })
            .catch(function (error) {

            });
    }
}
//注册
export function register(data, callback) {
    return dispatch => {
        axios.post(`${webLink}/regist`, {
            email: data.email,
            pwd: data.pwd,
            code: data.code
        })
            .then(function (response) {
                if (response.data.code === 1) {
                    dispatch({type: 'SHOW_REGTIP'})
                } else if (response.data.code === 0) {
                    //console.log(response.data.message)
                    Toast.hide()
                    message.error(data.language?response.data.message.en:response.data.message.zh);
                }
            })
            .catch(function (error) {

            });
    }
}
//提交初级认证资料
export function postBaseUserMsg(data, callback) {
    return dispatch => {
        axios.get('http://47.91.236.245:4030/user/customer/trade-info', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_BASEUSERMSG', data: response.data.data[0]})
                    callback()
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {

            });
    }
}
//获取初级认证资料
export function getDetailMsg(data, callback) {
    return dispatch => {
        axios.get(`${webLink}/primaryAuthMsg`, {
            params:{
                token:localStorage.getItem('token')
            }})
            .then(function (response) {
                callback(response.data)
            })
            .catch(function (error) {

            });
    }
}

export function resetPwd(data, callback) {
    return dispatch => {
        axios.post(`${webLink}/forgetPwd`, {
            email: data.email,
            // pwd: data.pwd,
            code: data.code
        })
            .then(function (response) {
                console.log(response)
                if (response.data.code === 0) {
                    Toast.hide()
                    message.error(data.language?response.data.message.en:response.data.message.zh);
                }else if (response.data.code === 1) {
                    //重置密码并登录
                    dispatch({type: 'SHOW_SETPWDTIP'})
                    Toast.hide()
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }
}

export function forgetPwdSet(data, callback) {
    return dispatch => {
        axios.post(`${webLink}/forgetPwdSet`, {
            pwd: data.pwd,
            // pwd: data.pwd,
            token: data.token,
            email:data.email
        })
            .then(function (response) {
                console.log(response)
                if (response.data.code === 0) {
                    // dispatch({type: 'MODIFYPWD'})
                    // callback()
                    Toast.hide()
                    message.error(response.data.message);
                }else if (response.data.code === 1) {
                    //重置密码并登录

                    //callback()
                    //console.log(response.data.message)
                    Toast.hide()
                    message.success('重置密码成功，请登录...')
                    setTimeout(function () {
                        dispatch({type: 'SHOW_LOGIN'})
                    },3500)
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }
}

// export function getPrimaryData(data, callback) {
//     return dispatch => {
//         axios.post('http://192.168.100.105:8000/primaryVerify', {
//             email:data.email,
//             token:data.token,
//             primaryCertified:data.primaryCertified
//         })
//             .then(function (response) {
//                 console.log(response)
//                 if (response.data.code === 0) {
//                     Toast.hide()
//                     message.error(response.data.message);
//                 }
//             })
//             .catch(function (error) {
//                 console.log(error)
//             });
//     }
// }

export function getCaptcha(data, callback) {
    return dispatch => {
        axios.post(`${webLink}/forgetPwdSet`, {
            pwd: data.pwd,
            // pwd: data.pwd,
            token: data.token,
            email:data.email
        })
            .then(function (response) {
                console.log(response)
                if (response.data.code === 0) {
                    // dispatch({type: 'MODIFYPWD'})
                    // callback()
                    Toast.hide()
                    message.error(response.data.message);
                }else if (response.data.code === 1) {
                    //重置密码并登录

                    //callback()
                    //console.log(response.data.message)
                    Toast.hide()
                    message.success('重置密码成功，请登录...')
                    setTimeout(function () {
                        dispatch({type: 'SHOW_LOGIN'})
                    },3500)
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }
}

export function setStatus(data, callback) {
    return dispatch => {
        dispatch({type: 'SET_STATUS', data: data})
    }
}