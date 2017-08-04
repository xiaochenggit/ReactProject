import React , { Component }  from 'react';
import { Tabs, Icon } from 'antd';
import { Redirect } from 'react-router-dom';
import UserCollections from '../../common/userCollections/';
import UserComments from '../../common/userComments/';
import UserChangeInfo from '../../common/userChangeInfo/';
import './style.css';

const TabPane = Tabs.TabPane;

class UserCenter extends Component {

    render() {
        // 判断用户是否登录没有登录 直接返回首页
        let userId = Number(localStorage.getItem('userId'));
        if(userId === 0) {
            return (
                <Redirect to={{ pathname: '/' }}/>
            ) 
        }
        return(
            <Tabs
            defaultActiveKey="1"
            tabPosition='top'
            animated={{'tabPane':false}}
            className='mobileUserCenter'
            >
                <TabPane tab={<span><Icon type="apple" />收藏的文章</span>} key="1">
                    <UserCollections />
                </TabPane>
                <TabPane tab={<span><Icon type="apple" />用户的评论</span>} key="2">
                    <UserComments />
                </TabPane>
                <TabPane tab={<span><Icon type="android" />更改信息</span>} key="3">
                    <UserChangeInfo/>
                </TabPane>
            </Tabs>
        )
    }

}

export default UserCenter;