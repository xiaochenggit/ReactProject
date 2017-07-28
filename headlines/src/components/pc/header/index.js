import React , { Component } from 'react';
import { Row, Col, Menu, Icon, Tabs, Form, message, Button, Input, Checkbox, Modal, Tooltip} from 'antd';
import './style.css';
import LoginForm from './loginForm';
const logo = require('../../../img/logo.png');

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class Header extends Component {

    constructor() {
        super();
        /**
         * {String} current 导航选项默认值 默认 top
         * {Boolean} modalVisible 弹窗是否显示 默认 false
         * {String} action 按钮的默认动作 默认 login
         * {Boolean} hasLogined 用户是否登录 默认 false
         * {String} userNickName 用户登录后的昵称 默认 （空）
         * {Number} userId 用户登录后的 id 默认 0
         */
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
			userId: 0,
			confirmDirty: false,
        }
		 this.handleClick = this.handleClick.bind(this);
		 this.handleSubmit = this.handleSubmit.bind(this);
		 this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
	}
	// 导航切换点击 当点击注册登录的时候改变modal状态
	handleClick(e) {
		if (e.key == 'register') {
			this.setState({
				modalVisible: true
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
	// 注册二次密码验证
	handleConfirmBlur(e) {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	// 注册提交
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				return false;
			}
		});
		let myFetchOptions = {
			method: 'GET'
		};
		let forData = this.props.form.getFieldsValue();
		console.log(this.props.form.getFieldsError());
		//console.log(forData);
	}
    render() {
		const { getFieldDecorator } = this.props.form;
		let state = this.state;
		// const formItemLayout = {
		// 	labelCol: {
		// 		xs: { span: 24 },
		// 		sm: { span: 6 },
		// 	},
		// 	wrapperCol: {
		// 		xs: { span: 24 },
		// 		sm: { span: 14 },
		// 	},
		// };
		// const tailFormItemLayout = {
		// 	wrapperCol: {
		// 		xs: {
		// 		span: 24,
		// 		offset: 0,
		// 		},
		// 		sm: {
		// 		span: 14,
		// 		offset: 6,
		// 		},
		// 	},
		// };
        let userShow = state.hasLogined ?
        <Menu.Item key="logout" className='register'>
            <Button type="primary">{state.userNickName}</Button>&nbsp;&nbsp;
            <a href='http://www.baidu.com' target='_blank'>
                <Button type="primary">个人中心</Button>
            </a>&nbsp;&nbsp;
            <Button>退出</Button>
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
					>
					<Tabs defaultActiveKey="1">
						<TabPane tab="注册" key="1">
							<Form onSubmit={this.handleSubmit} className="login-form">
								<FormItem  label="账户" hasFeedback >
									{getFieldDecorator('userName', {
										rules: [{ required: true, message: '请填写你的账户名', whitespace: true }],
									})(
										<Input />
									)}
								</FormItem>
								<FormItem label="密码" hasFeedback>
									{getFieldDecorator('password', {
										rules: [{
										required: true, message: '请设置你的密码!',
										}, {
										validator: this.checkConfirm,
										}],
									})(
										<Input type="password" />
									)}
								</FormItem>
								<FormItem  label="确认密码" hasFeedback >
									{getFieldDecorator('confirm', {
										rules: [{
										required: true, message: '两次密码不一样!',
										}, {
										validator: this.checkPassword,
										}],
									})(
										<Input type="password" onBlur={this.handleConfirmBlur} />
									)}
								</FormItem>
								<FormItem >
									<Button type="primary" htmlType="submit">注册</Button>
								</FormItem>
							</Form>
						</TabPane>
						<TabPane tab="登录" key="2">
							<LoginForm/>
						</TabPane>
					</Tabs>
				</Modal>
            </header>
        )
    }

}

export default Form.create()(Header);