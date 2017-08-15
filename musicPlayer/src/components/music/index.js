// 音乐播放器控制部分
import React , { Component } from 'react';
import PubSub from 'pubsub-js';
import ProgressPage from '../progressPage/';

class Music extends Component {
    constructor() {
        super();
        /**
         * @param {Number} index 音乐数组下标 默认 0
         * @param {Array} list 音乐数组 默认 []
         * @param {Array} likeMusics 喜欢的音乐的数组 默认[]
         * @param {Object} music 当前播放音乐的信息 默认 {}
         */
        this.state = {
            index: 0,
            list: [],
            likeMusics: [],
            music: {},
            LickMusicName: 'LICKMUSICS'
        }
        this.addMusic = this.addMusic.bind(this);
        this.deleteMusic = this.deleteMusic.bind(this);
    }
    componentWillMount() {
        // 默认加载本地音乐 json 文件
        let fetchOptions = {
            methods: 'GET'
        };
        fetch('/js/musicList.json',fetchOptions).then(res => res.json())
        .then(list => {
            this.setState({
                list,
                music: list[this.state.index]
            })
        })
    }
    componentDidMount(){
        let that = this;
        // 接收 addLive 事件
        PubSub.subscribe('addLive',function(msg,music){
            that.addMusic(music);
        })
        // 设置音乐 地址 状态(暂停 || 开始) 音量 格式
        $('#player').jPlayer({
            ready: function() {
                $(this).jPlayer('setMedia',{
                    mp3: that.state.music.file
                }).jPlayer('pause');
            },
            volume: 0.5,
            supplied: 'mp3, m4a',
            wmode: 'window'
        });
        this.deleteMusic(33467253);
    }
    // 切歌操作
    changeMusicIndex(index) {
        // 判断边界
        let length = this.state.list.length;
        if(index > length - 1) {
            index = 0;
        }
        if(index < 0) {
            index  = length - 1;
        }
        let that = this;
        // 改变音乐的播放地址
        $('#player').jPlayer('setMedia',{
            mp3: that.state.list[index].file
        }).jPlayer('play');  
        this.setState({
            index,
            music: this.state.list[index]
        });
    }
    /**
     * 添加喜欢的音乐到 存到 localStorage
     * @param {Object} music 音乐信息
     */
    addMusic(music) {
        let likeMusics = JSON.parse(localStorage.getItem(this.state.LickMusicName)) || [];
        var obj = {
            id: music.songinfo.song_id,
            title: music.songinfo.title,
            artist_name: music.songinfo.author,
            file: music.bitrate.file_link,
            pic_small: music.songinfo.pic_small
        }
        likeMusics.push(obj);
        localStorage.setItem(this.state.LickMusicName, JSON.stringify(likeMusics));
    }
    deleteMusic(musicId) {
        let likeMusics = JSON.parse(localStorage.getItem(this.state.LickMusicName)) || [];
        if(likeMusics.length === 0) {
            return false;
        }
        likeMusics.forEach(function(element, index) {
            if(element.id == musicId) {
                likeMusics.splice(index, 1);
                return false;
            }
        });
        localStorage.setItem(this.state.LickMusicName, JSON.stringify(likeMusics));
    }
    render(){
        return(
            <div>
                <ProgressPage music={this.state.music} 
                musicIndex={this.state.index} 
                changeMusicIndex={this.changeMusicIndex.bind(this)}
                />
            </div>
        )
    }
}

export default Music;