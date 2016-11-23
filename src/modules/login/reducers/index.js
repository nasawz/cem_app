/**
 * create by nasa.wang
 */

import { combineReducers } from 'redux'

import LOGIN from './login.js'

export default function createReducer(asyncReducers) {
    return combineReducers({
        LOGIN,
        ...asyncReducers
    })
}
