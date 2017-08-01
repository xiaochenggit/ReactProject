import React , { Component } from 'react';
import { Tabs, Icon } from 'antd';
import NavNewsList from './navNewsList/';
import Banner from '../../pc/banner';
import './style.css';
const TabPane = Tabs.TabPane;

class Nav extends Component {
    render() {
        return (
            <div className='mobileNav'>
                <Tabs defaultActiveKey="1" className='mobileBar'>
                    <TabPane tab={<span><Icon type="apple" />头条</span>} key="1">
                        <Banner/>
                        <NavNewsList type='top' count='20'/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="apple" />社会</span>} key="2">
                        <NavNewsList type='shehui' count='20'/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="apple" />国内</span>} key="3">
                        <NavNewsList type='guonei' count='20'/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="apple" />国际</span>} key="4">
                        <NavNewsList type='guoji' count='20'/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="apple" />娱乐</span>} key="5">
                        <NavNewsList type='yule' count='20'/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="apple" />体育</span>} key="6">
                        <NavNewsList type='tiyu' count='20'/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="apple" />科技</span>} key="7">
                        <NavNewsList type='keji' count='20'/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="apple" />时尚</span>} key="8">
                        <NavNewsList type='shishang' count='20'/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Nav;