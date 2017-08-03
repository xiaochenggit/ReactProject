import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import './style.css';

class UserCollections extends Component {

    constructor() {
        super();
        this.state = {
            collections: []
        };
    }

    componentDidMount() {
        let userId = Number(localStorage.getItem('userId'));
        let fetchOptions = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + userId,
        fetchOptions).then(res => res.json())
        .then((collections) => {
            collections = collections.reverse();
            this.setState({
                collections
            });
        });
    }

    render() {
        let state = this.state;
        let collectionsHTML = state.collections.length ?
        state.collections.map((item, index) =>{
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
            </div>
        )
    }

}

export default UserCollections;