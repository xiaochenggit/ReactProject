import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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