// 音乐播放器控制部分
import React , { Component } from 'react';
import ProgressPage from '../progressPage/';

class Music extends Component {
    constructor() {
        super();
        /**
         * @param {Number} index 音乐数组下标 默认 0
         * @param {Array} list 音乐数组 默认 []
         * @param {Object} music 当前播放音乐的信息 默认 {}
         */
        this.state = {
            index: 0,
            list: [],
            music: {}
        }
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
        // 设置音乐 地址 状态(暂停 || 开始) 音量 格式
        let that = this;
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