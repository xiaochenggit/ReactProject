import React , { Component } from 'react';
import { Icon , notification} from 'antd';
import './style.css';

// 通知提醒框 配置
notification.config({
  top: 50,
  duration: 3,
});

class Collection extends Component {
    /**
     * @param {Boolean} isCollection 用户是否已经收藏了该文章 默认没有
     * @memberof Collection
     */
    constructor() {
        super();
        this.state = {
            isCollection: false
        }
    }

    componentDidMount() {
        let uniquekey = this.props.uniquekey;
        let userId = Number(localStorage.getItem('userId'));
        let fetchOptions = {
            method: 'GET'
        };
        if(userId !== 0) { 
            fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + userId,
            fetchOptions).then(res => res.json())
            .then((collections) => {
                let that = this;
                collections.forEach(function(element) {
                    if(uniquekey === element.uniquekey){
                        that.setState({
                            isCollection: true
                        });
                        return false;
                    }
                });
            });
        }
    }

    handleClick() {
        let isCollection = this.state.isCollection;
        if(isCollection) {
            notification['error']({
                message: '收藏文章失败！',
                description: '已经收藏该文章了！',
            });
            return false;
        }
        let userId = Number(localStorage.getItem('userId'));
        if(userId !== 0) {
            let fetchOptions = {
                method: 'GET'
            };
            let uniquekey = this.props.uniquekey;
            fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=' + userId + 
            '&uniquekey=' + uniquekey, fetchOptions).then(res => res.json())
            .then((data) => {
                 notification['success']({
                    message: '收藏文章成功!',
                    description: '用户可以在个人中心中查看收藏的文章！',
                });
                this.setState({
                    isCollection: true
                })
            })
        } else {
            notification['error']({
                message: '收藏文章失败！',
                description: '请先用户先登录,再收藏文章！',
            });
        }
    }

    render() {
        return(
            <div className="collection">
                <Icon type={this.state.isCollection ? "star" : "star-o"} onClick={this.handleClick.bind(this)}/>
            </div>
        )
    }

}

export default Collection;