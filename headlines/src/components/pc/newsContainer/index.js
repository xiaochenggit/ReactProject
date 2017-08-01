import React , { Component } from 'react';
import { Row, Col, Tabs, Icon} from 'antd';
import NewsBlock from '../newsBlock/';
import NewsImageBlock from '../newsImageBlock/';
import Banner from '../banner/';

import './style.css';
const TabPane = Tabs.TabPane;

class NewsContainer extends Component {
    render() {
        return (
            <div className='newsContainer'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div className='left'>
                            <Banner/>
                            <NewsImageBlock title='国际新闻' count={6} type='guoji' width='480px' itemWidth={(480 - 26 - (3-1) * 12) / 3 + 'px'}/>
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
