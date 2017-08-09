import React , { Component } from 'react';
import Progress from './progress/';
class ProgressPage extends Component {
    /**
     * @parma {Number} percent 进度条百分比（1-100） 默认0
     * @parma {Number} duration 音乐最大时长 默认0
     */
    constructor() {
        super();
        this.state = {
            percent: 0,
            duration: 0
        }
    }
    componentDidMount() {
        // 设置音乐格式
        $('#player').jPlayer({
            ready: function() {
                $(this).jPlayer('setMedia',{
                    m4a: "http://www.jplayer.org/audio/m4a/Miaow-08-Stirring-of-a-fool.m4a"
                }).jPlayer('');
            },
            supplied: 'mp3, m4a',
            wmode: 'window'
        });
        // 绑定
        // percent: Math.round(e.jPlayer.status.currentTime) 具体播放时间
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            this.setState({
                duration: e.jPlayer.status.duration,
                percent: e.jPlayer.status.currentPercentAbsolute // 播放百分比
            });
        });
    }
    /**
     * 更新播放时间
     * @parma {percent} percent 百分比(0-1) 
     * 总时间 * 百分比 
     */
    changePercent(percent){
        $("#player").jPlayer('play', this.state.duration * percent);
    }
    componentWillUnmount() {
       // 解绑
       $('#player').unbind($.jPlayer.event.timeupdate);
    }
    render() {
        return(
            <div className='progressPage'>
                <div id="player"></div>
                <Progress percent={this.state.percent}
                changePercent={this.changePercent.bind(this)}/>
            </div>
        )
    }

}

export default ProgressPage;
