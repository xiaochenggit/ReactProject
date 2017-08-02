import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;

class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
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
		+ "&username="+formData.userName+"&password="+formData.password, myFetchOptions)
    .then( res => res.json())
    .then( (data) => {
      if(data) {
        this.props.login(formData.userName,data.UserId,'登陆成功!');
      }  else {
        message.error('账号或密码错误！');
      }
    });
	}
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem label='用户名'  hasFeedback >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem label='密码' hasFeedback  >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem >
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          {/* Or <a href="">register now!</a> */}
        </FormItem>
        <FormItem >
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);