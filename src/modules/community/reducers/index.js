/**
 * create by nasa.wang
 */

import { combineReducers } from 'redux'

import COMMUNITY from './community.js'

export default function createReducer(asyncReducers) {
    return combineReducers({
        COMMUNITY,
        ...asyncReducers
    })
}
