import {combineReducers} from 'redux'

import merge from 'lodash/merge'

import foreignExchange from './foreignExchange'
import user from './user'
import auth from './auth'

let states = {
    foreignExchange,
    user,
    auth

}

let _states = {}

for (let i in states) {
    _states[i] = states[i]()
}


export default combineReducers(states)

export const getInitialState = () => {
    return merge({}, _states, {})
}
