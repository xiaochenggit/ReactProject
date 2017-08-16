import React , { Component } from 'react';
import { Icon , message} from 'antd';
import PubSub from 'pubsub-js';
import $ from 'jquery';

class LickIcon extends Component {
    constructor() {
        super();
        /**
         * @parma {String} LickMusicName 喜欢的音乐数组在 localStorage name 默认 LICKMUSICS
         * @parma {Boolean} isLick 是否是喜欢状态 默认 false
         * @parma {String} searchSong 查询歌曲信息的接口 默认值 xxx
         */
        this.state = {
            LickMusicName: 'LICKMUSICS',
            isLick: false,
            searchSong: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid='
        }
    }
    componentDidMount() {
        this.isLickFunc(this.props.musicId);
    }
    componentWillReceiveProps(nextProps) {
        this.isLickFunc(nextProps.musicId);
    }
    /**
     * 判断此音乐 是否在喜欢在喜欢音乐的列表里
     * @param {Number} musicId
     */
    isLickFunc(musicId) {
        let isLick = false;
        let likeMusics = JSON.parse(localStorage.getItem(this.state.LickMusicName)) || [];
        if(likeMusics.length === 0) {
            return false;
        }
        likeMusics.forEach(function(element) {
            if(element.song_id == musicId) {
                isLick = true;
                return false;
            }
        });
        this.setState({
            isLick
        })
    }
    // 添加喜欢 找到音乐信息 然后发送给 music 管理中心
    addLike(){
        $.ajax({
            url: this.state.searchSong + this.props.musicId,
            type: 'POST',
            dataType: 'jsonp',
            xhrFields : {
                withCredentials:true
            },
            success: (data)=> {
               if(data.error_code == 22000){
                    PubSub.publish('addLike',data);
                    this.setState({
                        isLick: true
                    });
               } else {
                   message.error('添加失败');
               }
            },
            error: (err) => {
               message.error('添加失败' + err);
            }
        });
    }
    // 删除喜欢吧 MusicId 发送给 music 管理中心
    deleteLike() {
        PubSub.publish('deleteLike',this.props.musicId);
        this.setState({
            isLick: false
        })
    }
    componentWillUnmont() {
        PubSub.unsubscribe('getMusicId');
    }
    render() {
        return(
            this.state.isLick ? <Icon type="heart" onClick={this.deleteLike.bind(this)}/> : <Icon type="heart-o" onClick={this.addLike.bind(this)} />
        )
    }
}

export default LickIcon;