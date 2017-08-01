import React , { Component } from 'react';
// import {Link} from 'react-router';
import {Card} from 'antd';

class NewsBlock extends Component {
    constructor() {
        super();
        this.state = {
            news: []
        }
    }
    // 请求数据 根据类型和条目
    componentWillMount() {
        let fetchOptions = {
            method: 'GET'
        };
        let count = this.props.count || 10;
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' 
        + this.props.type + '&count=' + count,fetchOptions).then(res => res.json())
        .then((data) => {
            this.setState({
                news: data
            })
        })
    }
    render() {
        let news = this.state.news;
        let newsList = news.length ? 
        news.map((item, index) => 
            <li key={index}><a href={'detail/' + item.uniquekey}>{item.title}</a></li>
        )
        : '没有数据';
        return(
            <Card bordered={false}>
                <ul>
                    {newsList}
                </ul>
            </Card>
        )
    }
}

export default NewsBlock;