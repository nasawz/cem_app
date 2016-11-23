/**
 * create by nasa.wang
 */
import React from 'react'
import emitter from './emitter.js'
import request from 'superagent'
import variable from './variable.js'
import {parseError} from './parse-error.js'
import {getTenantAndLoginType} from './tenant-logintype.js'

import SiteNavBar from './site-navbar.jsx'
import SiteMenuBar from './site-menubar.jsx'

const Container = React.createClass({
    render() {
        let children = this.props.children
        return (
            <div>
                <SiteNavBar />
                <SiteMenuBar />
                {children}
                <footer className="site-footer">
                    <div className="site-footer-legal">© 2016 Baleina</div>
                    <div className="site-footer-right">
                    </div>
                </footer>
            </div>
        )
    }
})
export default Container
