export function showLogin(data, callback) {
    return dispatch => {
        dispatch({type: 'SHOW_LOGIN'})
        // console.log("reheh",data)
        // console.log("reheh222",callback)
        callback&&callback()
    }
}
/*
* localStorage.getItem('unReadMsg')
* localStorage.getItem('unReadMsg')==1?false:true
* */
export function showRegister() {
    return dispatch => {
        dispatch({type: 'SHOW_REGISTER'})
    }
}
export function mesList() {
    return dispatch => {
        dispatch({type: 'SHOW_NUM'})
    }
}

export function hmesList() {
    return dispatch => {
        dispatch({type: 'HIDE_NUM'})
    }
}

export function importpwd() {
    return dispatch => {
        dispatch({type: 'SHOW_IMPORTPWD'})
    }
}

export function shenList() {
    return dispatch => {
        dispatch({type: 'SHOW_SHENNUM'})

    }
}

export function isLogin() {
    return dispatch => {
        dispatch({type: 'NOW_LOGIN'})

    }
}

export function isChinese() {
    return dispatch => {
        dispatch({type: 'SHOW_CHINESE'})

    }
}

export function isEnglish() {
    return dispatch => {
        dispatch({type: 'SHOW_ENGLISH'})

    }
}

export function yinlist() {
    return dispatch => {
        dispatch({type: 'HIDDEN_SHENNUM'})

    }
}

export function hideAuth(data, callback) {
    return dispatch => {
        dispatch({type: 'HIDE_AUTH'})
        callback&&callback()
    }
}

export function showForgetTip() {
    return dispatch => {
        dispatch({type: 'SHOW_SERPWDTIP'})
    }
}

export function showResetPwd(data, callback) {
    return dispatch => {
        dispatch({type: 'SHOW_RESETPWD'})
        callback&&callback()
    }
}

export function showrePwdTip(data, callback) {
    return dispatch => {
        dispatch({type: 'SHOW_SERPWDTIP'})
        callback&&callback()
    }
}

