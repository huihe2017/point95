import axios from '../common/axiosConf'
import { hashHistory } from 'react-router'
import { message } from 'antd';
import Toast from 'antd-mobile/lib/toast';

export function login(data, callback) {
    return dispatch => {
        axios.post('http://192.168.100.105:8000/login', {
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

                    // localStorage.setItem('token',response.data.result.token);
                    // localStorage.setItem('role',response.data.result.role);
                    hashHistory.push('/')
                }else if (response.data.code === 0) {
                    console.log(response.data.message)
                    Toast.hide()
                    message.error(response.data.message);

                }
            })
            .catch(function (error) {
                console.log(error)
                // axios.post('http://47.91.236.245:4030/user/customer/log-out', {})
                //     .then(function (response) {
                //         if (response.data.code === 0) {
                //             dispatch({type: 'LOGOUT'})
                //             callback()
                //         } else {
                //             callback(response.data.msg)
                //         }
                //     })
                //     .catch(function (error) {
                //         dispatch({type: 'LOGOUT'})
                //     });
            });
    }
}

export function logout(data, callback) {
    return dispatch => {
        dispatch({type: 'LOGOUT'})

        // localStorage.removeItem('token');
        // localStorage.removeItem('role');
        hashHistory.push('/')
        // window.location.reload();
    }
}

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

export function register(data, callback) {
    return dispatch => {
        axios.post('http://192.168.100.105:8000/regist', {
            email: data.email,
            pwd: data.pwd,
            code: data.code
        })
            .then(function (response) {
                if (response.data.code === 1) {
                    // console.log(1,response.data)
                    dispatch({type: 'SHOW_REGTIP'})
                    //message.success(response.data.message);
                    // dispatch({type: 'LOGIN', data: response.data.data})
                    // callback()
                } else if (response.data.code === 0) {
                    //console.log(response.data.message)
                    Toast.hide()
                    message.error(response.data.message);
                }
            })
            .catch(function (error) {

            });
    }
}

export function getBaseUserMsg(data, callback) {
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

export function getDetailMsg(data, callback) {
    return dispatch => {
        axios.get('http://47.91.236.245:4030/user/customer/bank-card', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_DETAILMSG', data: response.data.data})
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {

            });
    }
}


export function resetPwd(data, callback) {
    return dispatch => {
        axios.post('http://192.168.100.105:8000/forgetPwd', {
            email: data.email,
            // pwd: data.pwd,
            code: data.code
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
                    dispatch({type: 'SHOW_REGTIP'})
                    //callback()
                    //console.log(response.data.message)
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
        axios.post('http://192.168.100.105:8000/forgetPwdSet', {
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