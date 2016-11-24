/**
 * create by nasa.wang
 */

import React from 'react'

const Home = React.createClass({
    render() {
        let minHeight = window.innerHeight
        return (
            <div className="page" data-animsition-in="fade-in" data-animsition-out="fade-out">
                <div className="page-content">
                    <div className="page-brand-info">
                        <div className="brand">
                            <img className="brand-img" src="assets/images/logo@2x.png" alt="..."/>
                            <h2 className="brand-text font-size-40">CEM</h2>
                        </div>
                        <p className="font-size-20">Community engine management.</p>
                    </div>

                    <div className="page-login-main" style={{minHeight:`${minHeight}px`}}>
                        <div className="brand hidden-md-up">
                            <img className="brand-img" src="assets/images/logo-blue@2x.png" alt="..."/>
                            <h3 className="brand-text font-size-40">Remark</h3>
                        </div>
                        <h3 className="font-size-24">登录</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

                        <form method="post" action="login-v2.html">
                            <div className="form-group">
                                <label className="sr-only" for="inputEmail">Email</label>
                                <input type="email" className="form-control" id="inputEmail" name="email" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <label className="sr-only" for="inputPassword">Password</label>
                                <input type="password" className="form-control" id="inputPassword" name="password" placeholder="Password"/>
                            </div>
                            <div className="form-group clearfix">
                                <div className="checkbox-custom checkbox-inline checkbox-primary pull-xs-left">
                                    <input type="checkbox" id="rememberMe" name="rememberMe"/>
                                    <label for="rememberMe">记住我</label>
                                </div>
                                <a className="pull-xs-right" href="forgot-password.html">忘记密码?</a>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">登录</button>
                        </form>

                        <footer className="page-copyright">
                            <p>WEBSITE BY baleina</p>
                            <p>© 2016. All RIGHT RESERVED.</p>
                        </footer>
                    </div>

                </div>
            </div>
        )
    }

})

export default Home
