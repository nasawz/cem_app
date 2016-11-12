/**
 * create by nasa.wang
 */
import React from 'react'
import mount from 'react-mount'
import * as antd from 'antd'

import keys from 'lodash/keys'
import toLower from 'lodash/toLower'
import intersection from 'lodash/intersection'

let _mounts = {}
let allEls = [].slice.call(document.body.querySelectorAll('*'))
allEls.forEach(function(el) {
    let regx = /\<(antd)-(\w*)(\s|\>)/i
    let mt = el.outerHTML.match(regx)
    if (mt) {
        _mounts[mt[2]] = {
            prefix: mt[1]
        }
    }
})
let _components = {}
keys(antd).map((item) => {
    _components[toLower(item)] = {
        prefix: 'antd',
        componentCls: item
    }
})

let mountObj = {}
intersection(keys(_mounts), keys(_components)).map((key) => {
    if (_mounts[key].prefix == _components[key].prefix) {
        mountObj[`${_mounts[key].prefix}-${key}`] = eval(`${_components[key].prefix}.${_components[key].componentCls}`)
    }
})
console.log(mountObj);
window.addEventListener('DOMContentLoaded', function() {
    mount(mountObj)
})
