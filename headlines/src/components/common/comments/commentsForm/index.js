import React , { Component } from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class CommentsForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        let error = this.props.form.getFieldsError();
		for (var key in error) {
			if(error[key] !== undefined){
				return false;
			}
        }
        let formData = this.props.form.getFieldsValue();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={this.handleSubmit} className="comment-form">
                <FormItem>
                    {getFieldDecorator('commnet', {
                        rules: [{ required: true, message: '请输入你的留言' }],
                    })(
                        <TextArea rows={4} placeholder="你想要说些什么呢！" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="comment-form-button">提交</Button>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create()(CommentsForm)