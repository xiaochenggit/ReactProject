import React , { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import { Icon, message , Progress} from 'antd';
// 播放按钮
class MusicPlayIcon extends Component {

    constructor(){
        super();
        /**
         * @param {String} searchSong 接口链接 获得音乐信息
         * @param {Object} music 正在播放的音乐 id percent isPlay  默认 0
         */
        this.state = {
            music: {
                id: 0,
                percent: 0,
                isPlay: false
            },
            searchSong: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid='
        }
    }
    // 添加获得 正在播放音乐 id percent isPlay
    componentDidMount(){
        let that = this;
        PubSub.subscribe('getMusic',function(msg,music){
            that.setMusic(music);
        });
    }
    // 设置正在播放的 music 的信息
    setMusic(music) {
        this.setState({
            music
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
    componentWillUnmount() {
        PubSub.unsubscribe('getMusic');
    }
    render() {
        // 判断是否是该音乐， 然后显示播放进度和播放状态
        let StateMusic = this.state.music;
        let PropMusic = this.props.music;
        let HTML = StateMusic.id == PropMusic.song_id
        ? <span className='musicPercent'>
            {StateMusic.isPlay ? <Icon type="pause-circle" onClick={this.changePlay.bind(this) }/>
            : <Icon type="play-circle" onClick={this.changePlay.bind(this) }/>}
            <Progress type="circle" percent={StateMusic.percent} width={20} showInfo={false} strokeWidth={10} />
          </span>
        : <span><Icon type="play-circle" onClick={this.musicPlay.bind(this, PropMusic)} /></span>;
        return(
            <span>{HTML}</span>
        )
    }
}

export default MusicPlayIcon;