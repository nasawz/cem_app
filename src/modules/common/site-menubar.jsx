import React, {PropTypes} from 'react'

const SiteMenuBar = React.createClass({
    render() {
        return (
            <div className="site-menubar">
                <ul className="site-menu" data-plugin="menu">
                    <li className="site-menu-item has-sub">
                        <a href="javascript:void(0)">
                            <i className="site-menu-icon wb-dashboard" aria-hidden="true"></i>
                            <span className="site-menu-title">概览</span>
                            <span className="site-menu-arrow"></span>
                        </a>
                        <ul className="site-menu-sub">
                            <li className="site-menu-item">
                                <a className="animsition-link" href="">
                                    <span className="site-menu-title">概览 v1</span>
                                </a>
                            </li>
                            <li className="site-menu-item">
                                <a className="animsition-link" href="">
                                    <span className="site-menu-title">概览 v2</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="site-menu-item active open">
                        <a href="javascript:void(0)">
                            <i className="site-menu-icon wb-hammer" aria-hidden="true"></i>
                            <span className="site-menu-title">设计器</span>
                            {/*<span className="site-menu-arrow"></span>*/}
                        </a>
                    </li>

                </ul>
            </div>
        )
    }
})

export default SiteMenuBar
