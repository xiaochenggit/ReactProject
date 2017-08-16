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
         */
        this.state = {
            searchSong: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid='
        }
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
        return(
            <Icon type="play-circle" onClick={this.musicPlay.bind(this, this.props.music)} />
        )
    }
}

export default MusicPlayIcon;