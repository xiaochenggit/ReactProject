// 音乐分类小模块

import React , { Component } from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'antd';
import './cover.css';
class Cover extends Component {
    /**
     * @param {String} update_date 更新时间 默认为空
     * @param {String} img 图片地址 默认为空
     * @param {String} name 分类名字 默认为空
     * @param {String} comment 分类描述 默认为空
     * @param {String} search 分类信息接口
     */
    constructor() {
        super();
        this.state = {
            update_date: '',
            img: '',
            name: '',
            comment: '',
            search: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type='
        }
    }
    componentWillMount() {
        // 判断 id 是否为 0  0是本地音乐模块 不需要搜索获得信息
        if(this.props.id != '0') {
            // 因为跨域了 所以使用 jsonp
            $.ajax({
                url: this.state.search + this.props.id,
                type: 'POST',
                dataType: 'jsonp',
                xhrFields : {
                    withCredentials:true
                },
                success: (data)=> {
                    let billboard = data.billboard;
                    this.setState({
                        update_date: billboard.update_date,
                        name: billboard.name,
                        comment: billboard.comment,
                        img: require('../../images/' + this.props.id + '.jpg')
                    });
                }
            });
        } else {
            // 本地音乐独自设置
            this.setState({
                update_date: '今天',
                name: '本地歌曲',
                comment: '本地歌曲',
                img: require('../../images/' + 8 + '.jpg')
            });
        }
    }
    render() {
        let state = this.state;
        return(
            <Card className='cover' style={{width: this.props.width}}>
                {/*跳转到列表页面  */}
                <Link to={'/list/'+ this.props.id}>
                    <div className="custom-image">
                        <img src={state.img} alt={state.name} title={state.comment} />
                    </div>
                    <div className="custom-card">
                        <h3>{state.name}</h3>
                    </div>
                </Link>
            </Card>
        )
    }

}

export default Cover;