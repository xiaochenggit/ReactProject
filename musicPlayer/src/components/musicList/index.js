import React , { Component } from 'react';
import { Row, Col , Card , Pagination, message} from 'antd';
import $ from 'jquery';
import LickIcon from './lickIcon.js';
import Header from '../header/';
import './index.css';
// 音乐列表

class MusicList extends Component {
    /**
     * @param {Array} song_listArr 所有音乐数组 默认[]
     * @param {Array} song_list 当前页音乐列表 []
     * @param {Number} pageSize 每页音乐条数 默认 10
     * @param {Number} pageIndex 当前页页码 默认 1
     * @param {Boolean} Jumper 分页是否需要搜索页功能 默认 false
     * @param {String}  img 此列表头图链接 默认''
     * @param {Objeact} billboard 当前列表信息 默认{}
     * @param {String} search 接口链接
     */
    constructor() {
        super();
        this.state = {
            song_listArr: [],
            pageSize: 10,
            pageIndex: 1,
            Jumper: false,
            img: '',
            song_list: [],
            billboard: {},
            LickMusicName: 'LICKMUSICS',
            search: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=',
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
    componentDidMount() {
        // 获得此页面分类 id
        let id = this.props.match.params.id;
        let pageIndex = this.state.pageIndex;
        // 判断是不是本地音乐 不是本地音乐接口获得数据
        if (id > 0) {
            $.ajax({
                url: this.state.search + id,
                type: 'POST',
                dataType: 'jsonp',
                xhrFields : {
                    withCredentials:true
                },
                success: (data)=> {
                    let billboard = data.billboard;
                    this.setState({
                        Jumper:  document.body.offsetWidth >= 800,
                        song_listArr: data.song_list,
                        song_list: data.song_list.slice((pageIndex - 1) * this.state.pageSize , this.state.pageSize),
                        billboard: billboard,
                        img: require('../../images/' + id + '.jpg')
                    });
                }
            });
        } else if(id == 0) {
            // 获得本地音乐列表文件
            let fetchOptions = {methods: 'GET'};
            fetch('/js/musicList.json',fetchOptions).then(res => res.json())
            .then(list =>{
                this.setState({
                    Jumper:  document.body.offsetWidth >= 800,
                    song_listArr: list,
                    song_list: list.slice((pageIndex - 1) * this.state.pageSize , this.state.pageSize),
                    billboard: {
                        name: '本地歌曲',
                        comment: '本地存在的歌曲列表！',
                        update_date: '今天'
                    },
                    img: require('../../images/' + 8 + '.jpg')
                });
            });
        }
        else if(id == -1) {
            // 获得存在 localStorage 里喜欢的音乐
            let list = JSON.parse(localStorage.getItem(this.state.LickMusicName)) || [];
            this.setState({
                Jumper:  document.body.offsetWidth >= 800,
                song_listArr: list,
                song_list: list.slice((pageIndex - 1) * this.state.pageSize , this.state.pageSize),
                billboard: {
                    name: '喜欢的音乐',
                    comment: '喜欢的音乐列表！',
                    update_date: '今天'
                },
                img: require('../../images/' + 18 + '.jpg')
            });
        }
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
        let id = this.props.match.params.id;
        let musicGroupHTML = this.state.song_list.length ?
        this.state.song_list.map((item,index) =>{
            return(
            <Card key={index}>
                <Row>
                    <Col span={6}>
                        <img src={item.pic_small} alt={item.title}/>
                        {item.title}
                    </Col>
                    <Col span={6}>{item.artist_name}</Col>
                    <Col span={6}>{item.album_title || '本地'}</Col>
                    <Col span={6}>
                       {id != 0 ? <span onClick={this.downLoad.bind(this,item.song_id)}>下载</span> : ''}
                       {id != 0 ? <span><LickIcon musicId={item.song_id}/></span> : '' }
                    </Col>
                </Row>
            </Card>
            )
        })
        : '暂无数据';
        return(
            <div className='main'>
                {/*公共头部  */}
                <Header />
                <div className='musicList'>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            {/*列表信息  */}
                            <div className='musicListTop'>
                                <img src={this.state.img} alt={this.state.billboard.name}/>
                                <div className='musicListdes'>
                                    <h2>{this.state.billboard.name}</h2>
                                    <p>{this.state.billboard.comment}</p>
                                    <p>{this.state.billboard.update_date}</p>
                                </div>
                            </div>
                            {/*音乐列表  */}
                            <div className='musicGroup'>
                                {musicGroupHTML}
                            </div>
                            {/*分页  */}
                            <Pagination style={{display: this.state.song_listArr.length > this.state.pageSize ? 'block' : 'none'}}
                                defaultPageSize={this.state.pageSize}
                                onChange={this.onChange.bind(this)}
                                total={this.state.song_listArr.length}
                                showQuickJumper={this.state.Jumper}
                                defaultCurrent={this.state.pageIndex}
                            />
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </div>
            </div>
        )
    }

}

export default MusicList;