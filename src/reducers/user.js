let initialState = {
    token: localStorage.token,
    userName: localStorage.userName,
    status: localStorage.status,//0:注册了  1:极速开户了  2:已绑定银行卡了（走完传统开户流程）
    MT4:localStorage.MT4,
    floating:'',
    balance:'',
    netWorth:'',
    realName:'',
    id:'',
    email:localStorage.email,
    address:localStorage.address,
    bankNo:'',
    bankName:'',
    branch:'',
    bankFrontImg:'',
    frontImg:'',
    reverseImg:'',
    bankCode:''





}

export default function sign(state = initialState, action = {}) {

    switch (action.type) {

        case 'LOGIN':

            const {phone,mt4_live_id,status,address,email} = action.data
            state.userName = phone
            localStorage.setItem('token', true)
            localStorage.setItem('userName', phone)
            localStorage.setItem('MT4', mt4_live_id)
            localStorage.setItem('status', (status===11?"2":status))
            localStorage.setItem('address', address)
            localStorage.setItem('email', email)
            state.token = true
            state.email = email
            state.address = address
            state.status = (status===11?"2":status)
            // state.MT4 = mt4_live_id
            return Object.assign({}, state, {})

        case 'LOGOUT':
            localStorage.removeItem('token')
            localStorage.removeItem('userName')
            localStorage.removeItem('MT4')
            localStorage.removeItem('status')
            localStorage.removeItem('address')
            localStorage.removeItem('email')
            state.token = false
            state.userName = false
            return Object.assign({}, state, {})

        case 'MODIFYPWD':
            return Object.assign({}, state, {})

        case 'REGISTER':
            return Object.assign({}, state, {})

        case 'GET_BASEUSERMSG':
            const {balance,total_withdraw,total_position_profit} = action.data
            state.balance = balance
            state.netWorth = total_withdraw
            state.floating = total_position_profit
            return Object.assign({}, state, {})

        case 'GET_DETAILMSG':
            console.log("ttt",action.data)
            const {branch_name,bank_card,real_name,id_card,bank_name,id_card_face,bank_card_face,id_card_back,bank_code} = action.data
            state.branch = branch_name
            state.bankNo = bank_card
            state.realName = real_name
            state.id = id_card
            state.bankName = bank_name
            state.bankFrontImg = bank_card_face
            state.frontImg = id_card_face
            state.reverseImg = id_card_back
            state.bankCode = bank_code
            return Object.assign({}, state, {})

        case 'SET_STATUS':
            state.status = "2"
            localStorage.setItem("status","2")
            return Object.assign({}, state, {})


        default:
            return state
    }

}

export function getSignStatus(state) {
    return state.sign.show
}
