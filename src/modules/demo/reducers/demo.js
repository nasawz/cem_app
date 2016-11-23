/* eslint-disable indent */

/**
 * create by nasa.wang
 */

import ActionTypes from '../constants/actionTypes.js'

import merge from 'lodash/merge'

const initialState = {
    name: '',
}

export default function DEMO(state = initialState, action = null) {
    switch (action.type) {
        case ActionTypes.DEMO_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}
