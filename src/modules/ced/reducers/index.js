/**
 * create by nasa.wang
 */

import { combineReducers } from 'redux'

import CED from './ced.js'

export default function createReducer(asyncReducers) {
    return combineReducers({
        CED,
        ...asyncReducers
    })
}
