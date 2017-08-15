import React , { Component } from 'react';
import { Row, Col , Icon} from 'antd';
import Progress from './progress/';
import './style.css';
class ProgressPage extends Component {
    /**
     * @parma {Number} percent 进度条百分比（1-100） 默认0
     * @parma {Number} duration 音乐最大时长 默认0
     */
    constructor() {
        super();
        this.state = {
            percent: 0,
            duration: 0,
            volume: 0,
            isPlay: false
        }
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }
    /**
     * 更新播放时间
     * @parma {percent} percent 百分比(0-1) 
     * 总时间 * 百分比 
     */
    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            let percent = e.jPlayer.status.currentPercentAbsolute;// 播放百分比
            this.setState({
                duration: e.jPlayer.status.duration,
                volume: e.jPlayer.status.volume * 100,
                percent 
            });
            if(percent >= 99.9) {
                this.next();
            }
        });
    }
    changePercent(percent){
        $("#player").jPlayer('play', this.state.duration * percent);
    }
    changeVolume(percent){
        $("#player").jPlayer('volume', percent);
    }
    changePlay(){
        if(this.state.isPlay) {
            $("#player").jPlayer('pause');
        } else {
            $("#player").jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
    }
    next() {
        this.props.changeMusicIndex(this.props.musicIndex + 1);
        this.setState({
            isPlay: true
        })
    }
    prev() {
        this.props.changeMusicIndex(this.props.musicIndex - 1);
        this.setState({
            isPlay: true
        })
    }
    // 解绑
    componentWillUnmount() {
       $('#player').unbind($.jPlayer.event.timeupdate);
    }
    render() {
        return(
            <div className='progressPage'>
                <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <div id="player"></div>
                    <div className='btn-group'>
                        <Icon type="left-circle" onClick={this.prev}/>
                        <Icon type={this.state.isPlay ? 'pause-circle' : "play-circle"} 
                        onClick={this.changePlay.bind(this)}/>
                        <Icon type="right-circle" onClick={this.next}/>
                    </div>
                    <div className='musicBox'>
                        <img src={this.props.music.pic_small} alt={this.props.music.title}></img>
                        <div className='musicDes'>
                            <p>
                                <span>{this.props.music.title}</span>
                                <span>{this.props.music.artist_name}</span>
                            </p> 
                            <Progress percent={this.state.percent}
                                changePercent={this.changePercent.bind(this)}
                                color='#C11B0F' barColor='#1E1E1E' height='8px'/>
                        </div>
                    </div>
                    <div className='musicVolume'>
                        <Icon type="sound" />
                        <div className="musicVolumeBox">
                            <Progress percent={this.state.volume}
                                changePercent={this.changeVolume.bind(this)}
                                color='#C11B0F' barColor='#1E1E1E' height='4px' />
                        </div>
                    </div>
                </Col>
                <Col span={2}>
                    {/* <audio src="http://yinyueshiting.baidu.com/data2/music/132536199/132536199.mp3?xcode=5985b1edb4efad56b4504f1dc3711450" autoplay="autoplay" controls="controls"></audio> */}
                </Col>
                </Row>
            </div>
        )
    }

}

export default ProgressPage;
