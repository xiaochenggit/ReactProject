import React , { Component } from 'react';
import { Icon, Tabs, message, Modal, Dropdown, Menu, Button} from 'antd';
import LoginForm from '../../pc/header/loginForm';
import RegisterForm from '../../pc/header/registerForm';
import './style.css';
const logo = require('../../../img/logo.png');
const TabPane = Tabs.TabPane;

class Header extends Component {
    constructor() {
        super();
        /**
         * {Boolean} modalVisible 弹窗是否显示 默认 false
         * {String} action 表单提交状态 默认 register
         * {Boolean} hasLogined 用户是否登录 默认 false
         * {String} userNickName 用户登录后的昵称 默认 （空）
         * {Number} userId 用户登录后的 id 默认 0
         */
        this.state = {
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
    componentDidMount() {
        let userNickName = localStorage.getItem('userNickName');
        let userId = Number(localStorage.getItem('userId'));
        if(userId !== 0) {
            this.setState({
                hasLogined: true,
                userNickName,
                userId
            })
        }
    }
    // 导航切换点击 当点击 注册/登录 的时候弹出注册、登陆框
	handleClick(e) {
        this.setState({
            modalVisible: true,
            modalKey: this.state.modalKey + 1
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
	login(userNickName,userId,mes) {
		this.setState({
			hasLogined: true,
			userNickName,
			userId
        });
        localStorage.setItem('userId',userId);
        localStorage.setItem('userNickName',userNickName);
		this.setModalVisible(false);
		message.success(mes);
	}
	layOut() {
		this.setState({
			hasLogined: false,
			userNickName: '',
			userId: 0
        });
        localStorage.setItem('userId', 0);
        localStorage.setItem('userNickName',"");
	}
    render() {
        let state = this.state;
        const menu = (
        <Menu>
            {/* <Menu.Item>
                {localStorage.getItem('userNickName')}
            </Menu.Item> */}
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href='/usercenter' >个人中心</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onClick={this.layOut.bind(this)}>退出</a>
            </Menu.Item>
        </Menu>
        );
        const userShow = this.state.hasLogined? 
        <div className='dropdownWarp'>
            <Dropdown overlay={menu}>
                <Button style={{ marginLeft: 8 }}>
                    {state.userNickName} <Icon type="down" />
                </Button>
            </Dropdown>
        </div>
        :<Icon type="user-add" onClick={this.handleClick}/>
        return(
            <header className='mobileheader'>
                <a href='/' className='logo'>
                    <img src={logo} alt='logo'></img>
                    <span>Headlines</span>
                </a>
                {userShow}
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