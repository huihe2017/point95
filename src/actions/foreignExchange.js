import axios from '../common/axiosConf'

export function getAccounded(data, callback) {
    data = data.data
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/bank-card', {
            sms_captcha: data.code,
            email: data.email,
            bank_code: 'ABC',
            bank_card: data.bankNo,
            bank_card_face: data.bankFrontImg,
            id_card: data.id,
            id_card_face: data.frontImg,
            id_card_back: data.reverseImg,
            real_name: data.realName
        })
            .then(function (response) {
                if (response.data.code === 0) {
                    callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {

            });
    }
}

export function getBankList(data, callback) {
    return dispatch => {
        axios.get('http://47.91.236.245:4030/user/bank-code', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_BANKLIST', data: response.data.data})
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
            });
    }
}


