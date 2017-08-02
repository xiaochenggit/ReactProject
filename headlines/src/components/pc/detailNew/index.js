import React , { Component } from 'react';
import { Row, Col, BackTop} from 'antd';
import NewImageBlock from '../newsImageBlock';
import Comments from '../../common/comments';
import './style.css';

class DetailNew extends Component {
    constructor() {
        super();
        this.state = {
            newsItem: {},
            type: 'top'
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
            document.title = json.title + ' — Headlines';
            let type = '';
            switch (json.realtype) {
                case "头条":
                    type = 'top';
                    break;
                case "社会":
                    type = 'shehui';
                    break;
                case "国内":
                    type = 'guonei';
                    break;
                case "国际":
                    type = 'guoji';
                    break;
                case "娱乐":
                    type = 'yule';
                    break;
                case "体育":
                    type = 'tiyu';
                    break;
                case "科技":
                    type = 'keji';
                    break;
                case "时尚":
                    type = 'shishang';
                    break;
                default:
                    type = 'top'; 
                    break;
            };
            this.setState({
                newsItem: json,
                type: type
            });
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
                    <Comments uniquekey={this.props.match.params.uniquekey}/>
                </Col>
                <Col span={6}>
                    <NewImageBlock type={this.state.type} count="10" width="100%" itemWidth="calc(100% / 2)" />
                </Col>
                <Col span={2}></Col>
                <BackTop />
            </Row>
        )
    }
}

export default DetailNew;