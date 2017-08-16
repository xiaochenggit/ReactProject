import React , { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import { Icon, message } from 'antd';
// 播放按钮
class MusicPlayIcon extends Component {

    constructor(){
        super();
        /**
         * @param {String} searchSong 接口链接 获得音乐信息
         * @param {Number} musicId 正在播放的音乐id 默认 0
         */
        this.state = {
            musicId: 0,
            searchSong: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid='
        }
    }
    // 添加获得 正在播放音乐id 事件
    componentDidMount(){
        let that = this;
        PubSub.subscribe('getMusicId',function(msg,musicId){
            that.setMusicId(musicId);
        });
    }
    // 设置正在播放的id
    setMusicId(musicId) {
        this.setState({
            musicId
        })
    }
    // 改变播放状态
    changePlay() {
        PubSub.publish('changPlay');
    }
    /**
     * 播放此音乐
     * @param {Object} music 音乐信息
     */
    musicPlay(music) {
        let id = this.props.id;
        // 非本地 和 喜欢音乐列表
        if (id > 0) {
            $.ajax({
                url: this.state.searchSong + music.song_id,
                type: 'POST',
                dataType: 'jsonp',
                xhrFields : {
                    withCredentials:true
                },
                success: (music)=> {
                    PubSub.publish('musicPlay',{
                        song_id: music.songinfo.song_id,
                        title: music.songinfo.title,
                        artist_name: music.songinfo.author,
                        album_title: music.songinfo.album_title,
                        file: music.bitrate.file_link,
                        pic_small: music.songinfo.pic_small
                    });
                },
                error: (err) => {
                message.error('播放失败' + err);
                }
            });
        } else {
            PubSub.publish('musicPlay', music);
        }
    }

    render() {
        let HTML = this.state.musicId == this.props.music.song_id
        ? <Icon type="pause-circle" onClick={this.changePlay.bind(this) }/> 
        : <Icon type="play-circle" onClick={this.musicPlay.bind(this, this.props.music)} />;
        return(
            <span>{HTML}</span>
        )
    }
}

export default MusicPlayIcon;