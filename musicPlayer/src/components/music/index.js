import React , { Component } from 'react';
import ProgressPage from '../progressPage/';

class Music extends Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            list: [],
            music: {
            }
        }
    }
    componentWillMount() {
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
        // 设置音乐格式
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
        // 绑定
        // percent: Math.round(e.jPlayer.status.currentTime) 具体播放时间
    }
    changeMusicIndex(index) {
        let length = this.state.list.length;
        if(index > length - 1) {
            index = 0;
        }
        if(index < 0) {
            index  = length - 1;
        }
        let that = this;
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