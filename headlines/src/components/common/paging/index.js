import React , { Component } from 'react';
import { Pagination } from 'antd';

class Paging extends Component {

    render() {
        return(
            <Pagination {...this.props}/>
        )
    }

}

export default Paging;