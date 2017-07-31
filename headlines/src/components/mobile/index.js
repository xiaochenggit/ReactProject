import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';
import Header from './header/';
import Footer from './footer/';
const TabPane = Tabs.TabPane;
class MobileIndex extends Component {
    render() {
        return(
            <div className='mobile'>
                <Header/>
                <Tabs
                defaultActiveKey="1"
                style={{ height: 220 }}
                className='mobileBar'
                >
                    <TabPane tab={<span><Icon type="apple" />头条</span>} key="1">头条</TabPane>
                    <TabPane tab={<span><Icon type="apple" />社会</span>} key="2">社会</TabPane>
                    <TabPane tab={<span><Icon type="apple" />国内</span>} key="3">国内</TabPane>
                    <TabPane tab={<span><Icon type="apple" />国际</span>} key="4">国际</TabPane>
                    <TabPane tab={<span><Icon type="apple" />娱乐</span>} key="5">娱乐</TabPane>
                    <TabPane tab={<span><Icon type="apple" />体育</span>} key="6">体育</TabPane>
                    <TabPane tab={<span><Icon type="apple" />科技</span>} key="7">科技</TabPane>
                    <TabPane tab={<span><Icon type="apple" />时尚</span>} key="8">时尚</TabPane>
                </Tabs>
                <Footer/>
            </div>
        )
    }
}

export default MobileIndex;