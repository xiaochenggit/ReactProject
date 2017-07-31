import React , { Component } from 'react';
import { Row, Col, Menu, Icon, Tabs, message, Button, Modal} from 'antd';
import './style.css';
import RegisterForm from './registerForm';
import LoginForm from './loginForm';
const logo = require('../../../img/logo.png');
const TabPane = Tabs.TabPane;

class Header extends Component {

    constructor() {
        super();
        /**
         * {String} current 导航选项默认值 默认 top
         * {Boolean} modalVisible 弹窗是否显示 默认 false
         * {String} action 表单提交状态 默认 register
         * {Boolean} hasLogined 用户是否登录 默认 false
         * {String} userNickName 用户登录后的昵称 默认 （空）
         * {Number} userId 用户登录后的 id 默认 0
         */
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'register',
            hasLogined: false,
            userNickName: '',
			userId: 0,
            confirmDirty: false,
            modalKey: 0,
        }
		this.handleClick = this.handleClick.bind(this);
		this.login = this.login.bind(this);
	}
	// 导航切换点击 当点击 注册/登录 的时候弹出注册、登陆框
	handleClick(e) {
		if (e.key === 'register') {
			this.setState({
                modalVisible: true,
                modalKey: this.state.modalKey + 1
			})
		}
		this.setState({
      		current: e.key,
    	});
	}
	// 改变modal 状态
    setModalVisible(value) {
        this.setState({
            modalVisible: value
        });
	}
	// tabs改变请求状态 
	callback(key) {
		if(key === '1') {
			this.setState({
				action: 'register'
			});
		} else {
			this.setState({
				action: 'login'
			});
		}
	}
	/**
	 * 登录成功后的返回函数
	 * @param {String} userName 登陆用户名字
	 * @param {Number} userId 登陆用户ID
	 * @param {String} mes 登录还是注册
	 * @memberof Header
	 */
	login(userName,userId,mes) {
		this.setState({
			hasLogined: true,
			userNickName: userName,
			userId: userId
		});
		this.setModalVisible(false);
		message.success(mes);
	}
	layOut() {
		this.setState({
			hasLogined: false,
			userNickName: '',
			userId: 0
		})
	}
    render() {
		let state = this.state;
        let userShow = state.hasLogined ?
        <Menu.Item key="logout" className='register'>
            <Button type="primary">{state.userNickName}</Button>&nbsp;&nbsp;
            <a href='http://www.baidu.com' target='_blank' style={{display:'inline-block'}} rel="noopener noreferrer">
                <Button type="primary">个人中心</Button>
            </a>&nbsp;&nbsp;
            <Button onClick={this.layOut.bind(this)}>退出</Button>
        </Menu.Item> :
        <Menu.Item key="register" className='register'>
             <Icon type="login" />登录 / 注册
        </Menu.Item>;
        return(
            <header className='pcheader'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={3}>
                        <a href="/" className='logo'>
                            <img src={logo} alt="logo"/>
                            <span>Headlines</span>
                        </a>
                    </Col>
                    <Col span={17}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick}>
                            <Menu.Item key="top">
                                <Icon type="appstore" />头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore" />社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore" />国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore" />国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore" />娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore" />体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore" />科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore" />时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                </Row>
				<Modal
					title="用户中心"
					wrapClassName="vertical-center-modal"
					visible={this.state.modalVisible}
					onOk={() => this.setModalVisible(false)}
					onCancel={() => this.setModalVisible(false)}
                    key={this.state.modalKey}
					>
					<Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
						<TabPane tab="注册" key="1">
							<RegisterForm action={state.action} login={this.login}/>
						</TabPane>
						<TabPane tab="登录" key="2">
							<LoginForm action={state.action} login={this.login}/>
						</TabPane>
					</Tabs>
				</Modal>
            </header>
        )
    }

}

export default Header;