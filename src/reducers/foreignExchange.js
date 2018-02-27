let initialState = {
    bankName: '中国银行',
    bankNo: '145*********352',
    accountBalance: 2354,
    exchangeRate: 0.346435,
    getAccountStep: 0,
    inGoldBanks: [
        {
            value: 1,
            label: '中国银行'
        },
        {
            value: 2,
            label: '工商银行'
        }, {
            value: 3,
            label: '建设银行'
        }, {
            value: 4,
            label: '农业银行'
        }
    ],
    outGoldBanks: []
}

export default function foreignExchange(state = initialState, action = {}) {

    switch (action.type) {

        case 'GETACCOUNT_STEP':
            return Object.assign({}, state, {
                getAccountStep: action.step
            })

        case 'GET_BANKLIST':
            state.outGoldBanks = action.data
            return Object.assign({}, state, {
                show: false
            })

        default:
            return state
    }

}

