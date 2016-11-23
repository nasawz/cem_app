/**
 * create by nasa.wang
 */

import { combineReducers } from 'redux'

import DEMO from './demo.js'

export default function createReducer(asyncReducers) {
    return combineReducers({
        DEMO,
        ...asyncReducers
    })
}
