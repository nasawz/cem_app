/**
 * create by nasa.wang
 */

import { combineReducers } from 'redux'

import DASHBOARD from './dashboard.js'

export default function createReducer(asyncReducers) {
    return combineReducers({
        DASHBOARD,
        ...asyncReducers
    })
}
