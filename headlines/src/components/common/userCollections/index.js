import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import Paging from '../paging/';
import './style.css';

class UserCollections extends Component {

    constructor() {
        super();
        this.state = {
            collectionsArr: [],
            collenctions: [],
            pageSize: 10,
            pageIndex: 1,
            Jumper: false
        };
    }
    /**
     * 页码改变重新设置 collenctions 、pageIndex
     * @param {Number} 请求改变的页码  
     * @memberof collenctionsList
     */
    onChange(pageNumber) {

        this.setState({
            pageIndex: pageNumber,
            collenctions: this.state.collectionsArr.slice((pageNumber - 1) * this.state.pageSize , pageNumber * this.state.pageSize)
        })
    }
    componentDidMount() {
        let pageIndex = 1;
        let userId = Number(localStorage.getItem('userId'));
        let fetchOptions = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + userId,
        fetchOptions).then(res => res.json())
        .then((collectionsArr) => {
            collectionsArr = collectionsArr.reverse();
            this.setState({
                Jumper:  document.body.offsetWidth >= 800,
                collectionsArr,
                pageIndex,
                collenctions: collectionsArr.slice((pageIndex - 1) * this.state.pageSize , this.state.pageSize)
            });
            let userNickName = localStorage.getItem('userNickName');
            document.title = userNickName + ' 个人中心 -Headlines';
        });
    }

    render() {
        let state = this.state;
        let collectionsHTML = state.collenctions.length ?
        state.collenctions.map((item, index) =>{
            let CreationTime = item.Id.CreationTime;
            CreationTime = Number(CreationTime.replace(/[^0-9]/g,""));
            let time = new Date(CreationTime).toLocaleDateString();
            return(
                <Card title={time} key={index}
                extra={<Link target="_black" to={"/detail/" + item.uniquekey}>查看</Link>}
                >
                    <p className='title'>
                        <Link target="_black" to={"/detail/" + item.uniquekey}>
                            {item.Title}
                        </Link>
                    </p>
                </Card>
            )
        })
        : '你还没有收藏任何文章！';
        return(
            <div className='userCollections'>
                {collectionsHTML}
                <Paging showQuickJumper={this.state.Jumper} current={this.state.pageIndex}  
                defaultPageSize={this.state.pageSize}
                total={this.state.collectionsArr.length} 
                onChange={this.onChange.bind(this)} />
            </div>
        )
    }

}

export default UserCollections;