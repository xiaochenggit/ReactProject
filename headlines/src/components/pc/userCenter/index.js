import React , { Component }  from 'react';
import { Row, Col, Tabs, Icon } from 'antd';
import { Redirect } from 'react-router-dom';
import UserCollections from '../../common/userCollections/';
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
            <Row className='pcUserCenter'>
                <Col span={2}></Col>
                <Col span={20}>
                    <Tabs defaultActiveKey="1" animated={{'tabPane':false}}>
                        <TabPane tab={<span><Icon type="apple" />收藏的文章</span>} key="1">
                            <UserCollections />
                        </TabPane>
                        <TabPane tab={<span><Icon type="apple" />用户的评论</span>} key="2">
                            用户的评论
                        </TabPane>
                        <TabPane tab={<span><Icon type="android" />更换头像</span>} key="3">
                            更换头像
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={2}></Col>
            </Row>
        )
    }

}

export default UserCenter;