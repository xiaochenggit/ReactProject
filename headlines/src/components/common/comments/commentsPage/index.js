import React , { Component } from 'react';
import { Pagination } from 'antd';

class CommentsPage extends Component {

    render() {
        return(
            <Pagination {...this.props}/>
        )
    }

}

export default CommentsPage;