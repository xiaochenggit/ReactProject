import React , { Component } from 'react';
import { Row , Col , message} from 'antd';
import $ from 'jquery';
import Header from '../header/';
import MusicList from '../musicList/';
import './style.css';
// 歌手详情页面

class Author extends Component {
    constructor() {
        super();
        /**
         * @param {Object} author 歌手信息 照片 姓名 简介 生日 公司 国家 体重 身高 星座
         * @param {Array} song_listArr 歌手歌曲列表 默认 []
         * @param {String} authorInfo / authorSongList 歌手信息 和 歌曲列表接口
         */
        this.state = {
            author: {
                avatar_s500: '',
                name: '',
                intro: '',
                birth: '1970-1-1',
                company: '',
                country: '',
                weight: 0,
                stature: 0,
                constellation: '双鱼'
            },
            song_listArr: [],
            authorInfo: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.artist.getInfo&tinguid=',
            authorSongList: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid='
        }
    }
    componentWillMount() {
        let that = this;
        // 获得路由歌手的 id
        let authorId = this.props.match.params.authorId;
        $.ajax({
            url: this.state.authorInfo + authorId,
            dataType: 'jsonp',
            type: 'GET',
            success: function(data){
                if(data.error_code) {
                    // 没有获得数据 跳转到首页
                    that.props.history.push('/');
                } else {
                    that.setState({
                        author: {
                            avatar_s500: data.avatar_s500,
                            name: data.name,
                            intro: data.intro,
                            birth: data.birth,
                            company: data.company,
                            country: data.country,
                            weight: data.weight,
                            stature: data.stature,
                            constellation: data.constellation
                        }
                    })
                }
            },
            error: function(err) {
                message.error(err);
            }
        });
        $.ajax({
            url: this.state.authorSongList + authorId,
            dataType: 'jsonp',
            type: 'GET',
            success: function(data){
                if(data.error_code != 22000) {
                    that.props.history.push('/');
                } else {
                    that.setState({
                        song_listArr: data.songlist
                    });
                }
            },
            error: function(err) {
                message.error(err);
            }
        });
    }
    render() {
        let author = this.state.author;
        return(
            <div className='main'>
                <Header/>
                <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <div className='author'>
                        <div className='authorDes'>
                            <img src={author.avatar_s500} alt={author.name} style={{float:'left'}}/>
                            <div>
                            <p className='name'>姓名：{author.name}</p>
                            <p className='stature'>身高：{author.stature || '未知'}</p>
                            <p className='weight'>体重：{author.weight || '未知'}</p>
                            <p className='company'>公司：{author.company || '未知'}</p>
                            <p className='country'>出生地：{author.country || '未知'}</p>
                            <p className='birth'>生日：{author.birth || '未知'}</p>
                            <p className='constellation'>星座：{author.constellation || '未知'}</p>
                            <p className='intro'>{author.intro || '艺人简介 未知' }</p>
                            </div>
                        </div>
                        <MusicList song_listArr={this.state.song_listArr} id={1}/>
                    </div>
                </Col>
                <Col span={2}></Col>
                </Row>
            </div>
        )
    }

}

export default Author;