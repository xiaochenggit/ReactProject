import React , { Component } from 'react';
import {Card} from 'antd'
import './style.css';

class NewsImageBlock extends Component {
    constructor() {
        super();
        this.state = {
            news: []
        }
    }
    componentWillMount() {
        let fetchOptions = {
            method: 'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' 
        + this.props.type + '&count=' + this.props.count,fetchOptions).then(res => res.json())
        .then((data) => {
            this.setState({
                news: data
            });
        });
    }
    render() {
        let news = this.state.news;
        let newsGroup = news.length ?
        news.map((item, index) => 
            <div className='newsImageItem' key={index} style={{width: this.props.itemWidth}}>
                <div className="custom-image">
                    <a href={item.url}>
                        <img alt="example" width="100%" src={item.thumbnail_pic_s} />
                        <h3>
                            {item.title}
                        </h3>
                    </a>
                </div>
                <div className="custom-card">
                    <p>{item.author_name}</p>
                </div>
            </div>
        )
        : '没有数据';
        return(
            <div className='newsImageBlock'>
                <Card title={this.props.title} style={{ width: this.props.width }}>
                    {newsGroup}
                </Card>
            </div>
        )
    }
}

export default NewsImageBlock;