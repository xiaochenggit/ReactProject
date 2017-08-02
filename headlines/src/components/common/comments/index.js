import React , { Component } from 'react';
import CommentsList from './commentsList/';
import CommentsForm from './commentsForm/';
import './style.css';

class Comments extends Component {
    render() {
        return(
            <div className='comment'>
                <h2>留言板</h2>
                <CommentsForm uniquekey={this.props.uniquekey}/>
                <CommentsList uniquekey={this.props.uniquekey}/>
            </div>
        )
    }
}

export default Comments;