import React , { Component } from 'react';
import { Icon , notification} from 'antd';
import './style.css';

// 通知提醒框 配置
notification.config({
  top: 50,
  duration: 3,
});

class Collection extends Component {

    handleClick() {
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
                <Icon type="star-o" onClick={this.handleClick.bind(this)}/>
            </div>
        )
    }

}

export default Collection;