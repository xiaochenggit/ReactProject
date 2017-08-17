import React , { Component } from 'react';
import { Row, Col , Card , Pagination, message } from 'antd';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import LickIcon from './lickIcon.js';
import MusicPlayIcon from './musicPlayIcon';
import './index.css';
// 音乐列表

class MusicList extends Component {
    /**
     * @param {Array} song_listArr 所有音乐数组 默认[]
     * @param {Array} song_list 当前页音乐列表 []
     * @param {Number} pageSize 每页音乐条数 默认 10
     * @param {Number} pageIndex 当前页页码 默认 1
     * @param {Boolean} Jumper 分页是否需要搜索页功能 默认 false
     * @param {String} search 接口链接 获得不同类型音乐数组列表】
     * @param {String} searchSong 接口链接 获得音乐信息
     */
    constructor() {
        super();
        this.state = {
            song_listArr: [],
            pageSize: 10,
            pageIndex: 1,
            Jumper: false,
            song_list: [],
            searchSong: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid='
        }
    }
    // 改变页码 改变当前页码和当前页音乐数组
    onChange(pageNumber) {
        this.setState({
            pageIndex: pageNumber,
            song_list: this.state.song_listArr.slice((pageNumber - 1) * this.state.pageSize , pageNumber * this.state.pageSize)
        });
    }
    componentWillReceiveProps(nextProps) {
        let pageIndex = this.state.pageIndex;
        this.setState({
            Jumper:  document.body.offsetWidth >= 800,
            song_listArr: nextProps.song_listArr,
            song_list: nextProps.song_listArr.slice((pageIndex - 1) * this.state.pageSize , this.state.pageSize)
        });
    }
    /**
     * @param {Number} musicId 下载歌曲的 id
     */
    downLoad(musicId) {
        $.ajax({
            url: this.state.searchSong + musicId,
            type: 'POST',
            dataType: 'jsonp',
            xhrFields : {
                withCredentials:true
            },
            success: (data)=> {
               window.open(data.bitrate.file_link);
               message.info('开始下载 ' + data.songinfo.title);
            },
            error: (err) => {
               message.error('下载失败！' + err);
            }
        });
    }
    render() {
        let id = this.props.id;
        let musicGroupHTML = this.state.song_list.length ?
        this.state.song_list.map((item,index) =>{
            return(
            <Card key={index}>
                <Row>
                    <Col span={6}>
                        <img src={item.pic_small} alt={item.title}/>
                        {item.title}
                    </Col>
                    <Col span={6}>
                        <Link to={'/author/' + item.ting_uid}>{item.author}</Link>
                    </Col>
                    <Col span={6}>{item.album_title || '本地'}</Col>
                    <Col span={6}>
                       {id != 0 ? <span onClick={this.downLoad.bind(this,item.song_id)}>下载</span> : ''}
                       {id != 0 ? <span><LickIcon musicId={item.song_id}/></span> : '' }
                       <MusicPlayIcon music={item} id={this.props.id}/>
                    </Col>
                </Row>
            </Card>
            )
        })
        : '暂无数据';
        return(
            <div className='musicGroup'>
                {musicGroupHTML}
                <Pagination style={{display: this.state.song_listArr.length > this.state.pageSize ? 'block' : 'none'}}
                defaultPageSize={this.state.pageSize}
                onChange={this.onChange.bind(this)}
                total={this.state.song_listArr.length}
                showQuickJumper={this.state.Jumper}
                defaultCurrent={this.state.pageIndex}/>
            </div>
        )
    }

}

export default MusicList;