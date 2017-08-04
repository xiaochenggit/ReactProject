import React , { Component } from 'react';
import { Form, Upload, Button, Icon, message } from 'antd';
import './style.css';
const FormItem = Form.Item;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  };
  console.log(file);
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class UserChangeInfo extends Component {
    constructor() {
        super();
        this.state = {
            imageUrl: ''
        };
    }
    handleChange = (info) => {
        if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
        });
    }
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
        return e;
        }
        return e && e.fileList;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const imageUrl = this.state.imageUrl;
        return (
            <div className='userChangeInfo'>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="头像上传">
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                        rules: [{
                            required: true, message: '请上传你的头像！',
                        }]
                    })(
                        <Upload
                            className="avatar-uploader"
                            name="avatar"
                            showUploadList={false}
                            action="//jsonplaceholder.typicode.com/posts/"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                            headers = {{authorization: 'authorization-text','Access-Control-Allow-Origin': '*'}}
                        >
                            {
                            imageUrl ?
                                <img src={imageUrl} alt="" className="avatar" /> :
                                <Icon type="plus" className="avatar-uploader-trigger" />
                            }
                        </Upload>
                    )}
                    </FormItem>
                    <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 6 },
                    }}
                    >
                    <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }

}

export default  Form.create()(UserChangeInfo);;