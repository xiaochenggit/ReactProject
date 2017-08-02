import React , { Component } from 'react';
import CommentsPage from '../commentsPage/';
import { Card } from 'antd';

class CommentsList extends Component {
    constructor() {
        super();
        this.state = {
            commentArr: [],
            comments: [],
            pageSize: 10,
            pageIndex: 1,
            Jumper: false
        }
    }
    onChange(pageNumber) {
        console.log(pageNumber);
        this.setState({
            pageIndex: pageNumber,
            comments: this.state.commentArr.slice((pageNumber - 1) * this.state.pageSize , pageNumber * this.state.pageSize)
        })
    }
    componentDidMount() {
        let fetchOptions = {
            method: 'GET'
        };
        let uniquekey = this.props.uniquekey;
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=' 
        + uniquekey, fetchOptions).then(res => res.json())
        .then(commentArr => {
            commentArr = commentArr.reverse();
            this.setState({
                Jumper:  document.body.offsetWidth >= 800,
                commentArr,
                comments: commentArr.slice((this.state.pageIndex - 1) * this.state.pageSize , this.state.pageSize)
            });
        });
       
    }
    render(){
        let comments = this.state.comments;
        let commentsHTML = comments.length ?
        comments.map((item, index) =>
            <Card key={index} title={item.UserName === 'undefined' ?'匿名':item.UserName} 
            extra={<p>{item.datetime}</p>} bordered={false}>
                <p>{item.Comments}</p>
            </Card>
        ) 
        : '没有评论';
        return(
            <div className='commentsList'>
                {commentsHTML}
                <CommentsPage showQuickJumper={this.state.Jumper} defaultCurrent={this.state.pageIndex}  
                defaultPageSize={this.state.pageSize}
                total={this.state.commentArr.length} 
                onChange={this.onChange.bind(this)} />
            </div>
        )
    }
}

export default CommentsList; 