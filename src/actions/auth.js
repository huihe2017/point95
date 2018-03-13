export function showLogin(data, callback) {
    return dispatch => {
        dispatch({type: 'SHOW_LOGIN'})
        // console.log("reheh",data)
        // console.log("reheh222",callback)
        callback&&callback()
    }
}

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

export function showResetPwd(data, callback) {
    return dispatch => {
        dispatch({type: 'SHOW_RESETPWD'})
        callback&&callback()
    }
}