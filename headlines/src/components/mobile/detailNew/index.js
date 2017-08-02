import React , { Component } from 'react';
import { BackTop } from 'antd';
import Comments from '../../common/comments';
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
            document.title = json.title + ' — Headlines';
            this.setState({
                newsItem: json
            });
        });
    }

    render() {
        let newsItem = this.state.newsItem;
        let newHTML = newsItem.pagecontent ? newsItem.pagecontent : '没有数据';
        return(
            <div>
                <div className='MobiledetailNew' dangerouslySetInnerHTML={{__html: newHTML}}></div>
                <Comments uniquekey={this.props.match.params.uniquekey}/>
                <BackTop />
            </div>
            
        )
    }
}

export default DetailNew;