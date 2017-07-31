import React , { Component } from 'react';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            confirmDirty: false
        }
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // 注册二次密码验证
	handleConfirmBlur(e) {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	checkPassword(rule, value, callback) {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
		callback('两次密码不一样!');
		} else {
		callback();
		}
    };
    // 注册 登录 提交
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
		let formData = this.props.form.getFieldsValue();
		let error = this.props.form.getFieldsError();
		for (var key in error) {
			if(error[key] !== undefined){
				return false;
			}
		}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.props.action
        + "&username=" + formData.userName + "&password=" + formData.password + "&confirm=" 
        + formData.confirm, myFetchOptions)
		.then((data) => {
			this.props.login(formData.userName,Math.round(Math.random() * 100000),'注册成功！');
		})
	}
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.handleSubmit} className="register-form">
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
                        required: true, message: '请再次设置你的密码!',
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
        )
    }
}

export default Form.create()(RegisterForm);