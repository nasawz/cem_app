/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.less'

import { DatePicker } from 'antd'
ReactDOM.render(<DatePicker />, document.getElementById('container'))




// import { Provider } from 'react-redux'
// import store from './store'
// import Routes from './routes/spa.jsx'
// import {navigate} from 'react-mini-router'
//
// const App = React.createFactory(Routes)
//
// import '../../style/index.less'
//
// require('safe')(React, {
//     errorHandler: function () {
//         // console.log(errReport);
//     }
// })
//
// ReactDOM.render(
//     <Provider store={store()}>
//         {App({ root:'/community' })}
//     </Provider>,
//     document.getElementById('container')
// )
//
// if (window.location.hash == '#/') {
//     navigate('/community/home')
// }