import React , { Component } from 'react';
import CommentsPage from '../commentsPage/';
import CommentsForm from '../commentsForm/';
import { Card } from 'antd';

class CommentsList extends Component {
    /**
     * 留言组件
     * state 数据
     * {Array} commentArr 全部评论数据 []
     * {Array} comments 当前页评论数据 []
     * {Number} pageSize 每页得评论条目 10
     * {Number} pageIndex 当前页码 1
     * {Boolean} Jumper 是否可以跳页 默认 false 电脑端加判断默认为 true
     * @memberof CommentsList
     */
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
    /**
     * 页码改变重新设置 comments 、pageIndex
     * @param {Number} 请求改变的页码  
     * @memberof CommentsList
     */
    onChange(pageNumber) {

        this.setState({
            pageIndex: pageNumber,
            comments: this.state.commentArr.slice((pageNumber - 1) * this.state.pageSize , pageNumber * this.state.pageSize)
        })
    }
    /**
     * 加载完成请求数据 uniquekey(文章唯一标识) 
     * @memberof CommentsList
     */
    componentDidMount() {
        let uniquekey = this.props.uniquekey;
        let pageIndex = 1;
        let fetchOptions = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=' 
        + uniquekey, fetchOptions).then(res => res.json())
        .then(commentArr => {
            commentArr = commentArr.reverse();
            this.setState({
                Jumper:  document.body.offsetWidth >= 800,
                commentArr,
                pageIndex,
                comments: commentArr.slice((pageIndex - 1) * this.state.pageSize , this.state.pageSize)
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
                <CommentsForm uniquekey={this.props.uniquekey} commentSuccess={this.componentDidMount.bind(this)}/>
                {commentsHTML}
                <CommentsPage showQuickJumper={this.state.Jumper} current={this.state.pageIndex}  
                defaultPageSize={this.state.pageSize}
                total={this.state.commentArr.length} 
                onChange={this.onChange.bind(this)} />
            </div>
        )
    }
}

export default CommentsList; 