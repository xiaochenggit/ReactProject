import React , { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import Collection from '../../collection/';
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
        // 遍历判断有没有错误 、 有错误就显示错误什么都不做
        let error = this.props.form.getFieldsError();
		for (var key in error) {
			if(error[key] !== undefined){
				return false;
			}
        }
        let userId = Number(localStorage.getItem('userId'));
        // 判断登录状态
        if (userId !== 0) {
            let fetchOptions = {
                method: 'GET'
            };
            let uniquekey = this.props.uniquekey;
            let formData = this.props.form.getFieldsValue();
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + userId + 
            "&uniquekey="+ uniquekey +"&commnet=" + formData.commnet, fetchOptions)
            .then(res => res.json())
            .then((data) => {
                message.success('评论成功！');
                this.props.form.resetFields();
                this.props.commentSuccess();
            })
        } else {
            message.error('请先登录');
        }
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
                    <Collection uniquekey={this.props.uniquekey}/>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create()(CommentsForm)