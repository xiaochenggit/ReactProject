import React , {Component} from 'react';
import {Card} from 'antd';
import './style.css';

class NavNewsList extends Component {
    constructor() {
        super();
        this.state = {
            news: []
        }
    }
    componentWillMount() {
        let fetchOptions = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' 
        + this.props.type + '&count=' + this.props.count, fetchOptions).then(res => res.json())
        .then((data) => {
            this.setState({
                news: data
            });
        });
    }
    render() {
        let news = this.state.news;
        let NewList = news.length ?
        news.map((item, index) =>
            <li key={index}>
                <div className='newsimgGroup'>
                    <a href={item.url}>
                        <img src={item.thumbnail_pic_s} alt={item.title}/>
                    </a>
                </div>
                <div className="newsDesGroup">
                    <p className="newsTitle">
                        <a href={item.url}>
                            {item.title}
                        </a>
                    </p>
                    <p className='newsTypeGroup'>
                        <span className='newsType'>{item.realtype}</span>
                        <span className="newsAuthor">{item.author_name}</span>
                    </p>
                </div>
            </li>
        ) 
        : '暂时没有数据';
        return(
            <Card className='navNewsList' bordered={false}>
                <ul>{NewList}</ul>
            </Card>
        )
    }
}

export default NavNewsList;