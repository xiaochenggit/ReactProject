import React , { Component } from 'react';
import { Row, Col, Carousel, Tabs, Icon} from 'antd';
import NewsBlock from '../newsBlock/';
import './style.css';
const bannerImg = require('../../../img/2.jpg');
const TabPane = Tabs.TabPane;

class NewsContainer extends Component {
    render() {
        return (
            <div className='newsContainer'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div className='left'>
                            <Carousel autoplay>
                                <div>
                                    <a href='http://www.baidu.com' target='_blank' rel="noopener noreferrer">
                                        <img src={bannerImg} alt='bannerimg'></img>
                                    </a>
                                </div>
                                <div>
                                    <a href='http://www.baidu.com' rel="noopener noreferrer">
                                        <img src={bannerImg} alt='bannerimg'></img>
                                    </a>
                                </div>
                                <div>
                                    <a href='http://www.baidu.com' rel="noopener noreferrer">
                                        <img src={bannerImg} alt='bannerimg'></img>
                                    </a>
                                </div>
                                <div>
                                    <a href='http://www.baidu.com' rel="noopener noreferrer">
                                        <img src={bannerImg} alt='bannerimg'></img>
                                    </a>
                                </div>
                            </Carousel>
                        </div>
                        <div className='right'>
                            <Tabs defaultActiveKey="2" animated={{'tabPane':false}}>
                                <TabPane tab={<span><Icon type="apple" />新闻</span>} key="1">
                                    <NewsBlock type='top' count='10'/>
                                </TabPane>
                                <TabPane tab={<span><Icon type="android" />娱乐</span>} key="2">
                                    <NewsBlock type='yule' />
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}

export default NewsContainer;
