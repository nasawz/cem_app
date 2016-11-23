/**
 * create by nasa.wang
 */

import React from 'react'
import {Row, Col} from 'antd';
import {Card} from 'antd';

const Home = React.createClass({
    render() {
        let minHeight = window.innerHeight-100
        return (
            <div className="page" style={{minHeight:`${minHeight}px`}}>
                <div className="page-content">
                    <Row gutter={16}>
                        <Col className="gutter-row" span={18}>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={16}>
                                    <Card title="用户数" bordered={false} extra={<span>2016-11-15 11:03</span>}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                </Col>
                                <Col className="gutter-row" span={8}>
                                    <Card title="资讯" bordered={false} extra={<span>2016-11-15 11:03</span>}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                </Col>
                            </Row>
                            <p></p>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={24}>
                                    <Card title="帖子" bordered={false} extra={<span>2016-11-15 11:03</span>}>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                        <p>Card content</p>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Card title="商品" bordered={false} extra={<span>2016-11-15 11:03</span>}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                            <p></p>
                            <Card title="任务数" bordered={false} extra={<span>2016-11-15 11:03</span>}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

})

export default Home
