import React, {PropTypes} from 'react'

const SiteNavBar = React.createClass({
    render() {
        return (
            <nav className="site-navbar navbar navbar-default navbar-fixed-top navbar-mega" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggler hamburger hamburger-close navbar-toggler-left hided" data-toggle="menubar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="hamburger-bar"></span>
                    </button>
                    <button type="button" className="navbar-toggler collapsed" data-target="#site-navbar-collapse" data-toggle="collapse">
                        <i className="icon wb-more-horizontal" aria-hidden="true"></i>
                    </button>
                    <div className="navbar-brand navbar-brand-center site-gridmenu-toggle" data-toggle="gridmenu">
                        <img className="navbar-brand-logo" src="assets/images/logo.png" title="CEM"/>
                        <span className="navbar-brand-text hidden-xs-down">
                            CEM</span>
                    </div>
                    <button type="button" className="navbar-toggler collapsed" data-target="#site-navbar-search" data-toggle="collapse">
                        <span className="sr-only">Toggle Search</span>
                        <i className="icon wb-search" aria-hidden="true"></i>
                    </button>
                </div>

                <div className="navbar-container container-fluid">
                    {/*<!-- Navbar Collapse -->*/}
                    <div className="collapse navbar-collapse navbar-collapse-toolbar" id="site-navbar-collapse">
                        {/*<!-- Navbar Toolbar -->*/}
                        <ul className="nav navbar-toolbar">
                            <li className="nav-item hidden-float" id="toggleMenubar">
                                <a className="nav-link" data-toggle="menubar" href="#" role="button">
                                    <i className="icon hamburger hamburger-arrow-left">
                                        <span className="sr-only">Toggle menubar</span>
                                        <span className="hamburger-bar"></span>
                                    </i>
                                </a>
                            </li>
                            <li className="nav-item hidden-sm-down" id="toggleFullscreen">
                                <a className="nav-link icon icon-fullscreen" data-toggle="fullscreen" href="#" role="button">
                                    <span className="sr-only">Toggle fullscreen</span>
                                </a>
                            </li>
                            <li className="nav-item hidden-float">
                                <a className="nav-link icon wb-search" data-toggle="collapse" href="#" data-target="#site-navbar-search" role="button">
                                    <span className="sr-only">Toggle Search</span>
                                </a>
                            </li>
                        </ul>
                        {/*<!-- End Navbar Toolbar -->*/}

                        {/*<!-- Navbar Toolbar Right -->*/}
                        <ul className="nav navbar-toolbar navbar-right navbar-toolbar-right">
                            <li className="nav-item dropdown">
                                <a className="nav-link navbar-avatar" data-toggle="dropdown" href="#" aria-expanded="false" data-animation="scale-up" role="button">
                                    <span className="avatar avatar-online">
                                        <img src="assets/portraits/face.png" alt="..."/>
                                        <i></i>
                                    </span>
                                </a>
                                <div className="dropdown-menu" role="menu">
                                    <a className="dropdown-item" href="javascript:void(0)" role="menuitem">
                                        <i className="icon wb-user" aria-hidden="true"></i>
                                        账户信息</a>
                                    <a className="dropdown-item" href="javascript:void(0)" role="menuitem">
                                        <i className="icon wb-settings" aria-hidden="true"></i>
                                        设置</a>
                                    <div className="dropdown-divider" role="presentation"></div>
                                    <a className="dropdown-item" href="javascript:void(0)" role="menuitem">
                                        <i className="icon wb-power" aria-hidden="true"></i>
                                        退出</a>
                                </div>
                            </li>
                            {/*
                                <li className="nav-item" id="toggleChat">
                                <a className="nav-link" data-toggle="site-sidebar" href="javascript:void(0)" title="Chat" data-url="../site-sidebar.tpl">
                                <i className="icon wb-chat" aria-hidden="true"></i>
                                </a>
                                </li>
                            */}
                        </ul>
                        {/*<!-- End Navbar Toolbar Right -->*/}
                    </div>
                    {/*<!-- End Navbar Collapse -->*/}

                    {/*<!-- Site Navbar Seach -->*/}
                    <div className="collapse navbar-search-overlap" id="site-navbar-search">
                        <form role="search">
                            <div className="form-group">
                                <div className="input-search">
                                    <i className="input-search-icon wb-search" aria-hidden="true"></i>
                                    <input type="text" className="form-control" name="site-search" placeholder="搜索..."/>
                                    <button type="button" className="input-search-close icon wb-close" data-target="#site-navbar-search" data-toggle="collapse" aria-label="Close"></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/*<!-- End Site Navbar Seach -->*/}
                </div>
            </nav>
        )
    }
})

export default SiteNavBar
