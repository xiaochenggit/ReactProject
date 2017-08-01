import React , { Component } from 'react';
import { Row, Col } from 'antd';
import './style.css';

class DetailNew extends Component {
    constructor() {
        super();
        this.state = {
            newsItem: {}
        }
    }

    componentDidMount(){
        // 获得路由参数
        let uniquekey = this.props.match.params.uniquekey;
        let fetchOptions = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=' + 
        uniquekey, fetchOptions).then(res => res.json())
        .then((json) => {
            this.setState({
                newsItem: json
            });
            document.title = json.title + ' — Headlines'
        });
    }

    render() {
        let newsItem = this.state.newsItem;
        let newHTML = newsItem.pagecontent ? newsItem.pagecontent : '没有数据';
        return(
            <Row>
                <Col span={2}></Col>
                <Col span={14}>
                    <div className='detailNew' dangerouslySetInnerHTML={{__html: newHTML}}></div>
                </Col>
                <Col span={6}></Col>
                <Col span={2}></Col>
            </Row>
        )
    }
}

export default DetailNew;