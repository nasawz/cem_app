/**
 * create by nasa.wang
 */
import React, {PropTypes} from 'react'
import {RouterMixin} from 'react-mini-router'

// import Container from '../../common/container.jsx'
import Home from '../containers/homeContainer.js'

const Routes = React.createClass({
    mixins: [RouterMixin],
    childContextTypes: {
        runType: PropTypes.string.isRequired
    },
    getChildContext: function() {
        return {
            runType: 'spa'
        }
    },
    routes: {
        '/home': 'home',
    },
    componentDidMount() {
        document.body.className = 'animsition page-login-v2 layout-full page-dark'
    },
    render () {
        return (
            <div>
                { this.renderCurrentRoute() }
            </div>
        )
    },
    home(params) {
        return <div><Home params={params} /></div>
    },
    notFound(path) {
        if (path == '/') {
            return <div />
        }else{
            return <div className="not-found">Page Not Found: {path}</div>
        }
    }
})

export default Routes
