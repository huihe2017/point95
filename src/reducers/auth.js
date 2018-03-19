let initialState = {
    showLoginBox: false,
    showResetPwdBox: false,
    showRegisterBox: false,
    mesList:false,
    shenList:false,
    showChangePwd:false,
    showRegisterTip:false,
    showForgetTip:false,
    isLogin:false
}

export default function auth(state = initialState, action = {}) {

    switch (action.type) {

        case 'SHOW_LOGIN':
            state.showLoginBox = true
            state.showRegisterBox = false
            state.showResetPwdBox = false
            state.showChangePwd = false
            state.showRegisterTip = false
            state.showForgetTip = false
            return Object.assign({}, state, {})

        case 'SHOW_REGISTER':
            state.showLoginBox = false
            state.showRegisterBox = true
            state.showChangePwd = false
            state.showRegisterTip = false
            state.showForgetTip = false
            return Object.assign({}, state, {})

        case 'SHOW_RESETPWD':
            state.showLoginBox = false
            state.showResetPwdBox = true
            state.showChangePwd = false
            state.showRegisterTip = false
            state.showForgetTip = false
            return Object.assign({}, state, {})

        case 'HIDE_AUTH':
            state.showLoginBox = false
            state.showRegisterBox = false
            state.showResetPwdBox = false
            state.showChangePwd = false
            state.showRegisterTip = false
            state.showForgetTip = false
            return Object.assign({}, state, {})

        case 'HIDE_NUM':
            state.mesList = false;
            return Object.assign({}, state, {})

        case 'SHOW_NUM':
            state.mesList = true;
            return Object.assign({}, state, {})

        case 'SHOW_SHENNUM':
            state.shenList = true;
            return Object.assign({}, state, {})

        case 'HIDDEN_SHENNUM':
            state.shenList = false;
            return Object.assign({}, state, {})

        case 'NOW_LOGIN':
            state.isLogin = true;
            return Object.assign({}, state, {})

        case 'SHOW_IMPORTPWD':
            state.showLoginBox = false
            state.showResetPwdBox = false
            state.showChangePwd = true
            state.showRegisterTip = false
            return Object.assign({}, state, {})

        case 'SHOW_REGTIP':
            state.showLoginBox = false
            state.showRegisterBox = false
            state.showResetPwdBox = false
            state.showChangePwd = false
            state.showRegisterTip = true
            state.showForgetTip=false
            return Object.assign({}, state, {})

        case 'SHOW_SETPWDTIP':
            state.showLoginBox = false
            state.showRegisterBox = false
            state.showResetPwdBox = false
            state.showChangePwd = false
            state.showRegisterTip = false
            state.showForgetTip = true
            return Object.assign({}, state, {})

        default:
            return state
    }

}

