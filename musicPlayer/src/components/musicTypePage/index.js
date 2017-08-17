import React , { Component } from 'react';
import { Row, Col} from 'antd';
import $ from 'jquery';
import Header from '../header/';
import MusicList from '../musicList/';
// 音乐类型page

class MusicTypePage extends Component {
    /**
     * @param {Array} song_listArr 所有音乐数组 默认[]
     * @param {String}  img 此列表头图链接 默认''
     * @param {Objeact} billboard 当前列表信息 默认{}
     * @param {String} search 接口链接 获得不同类型音乐数组列表】
     * @param {String} searchSong 接口链接 获得音乐信息
     */
    constructor() {
        super();
        this.state = {
            song_listArr: [],
            img: '',
            billboard: {},
            LickMusicName: 'LICKMUSICS',
            search: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type='
        }
    }
    componentDidMount() {
        // 获得此页面分类 id
        let id = Number(this.props.match.params.id);
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
                    if(data.song_list) {
                        let billboard = data.billboard;
                        this.setState({
                            song_listArr: data.song_list,
                            billboard: billboard,
                            img: require('../../images/' + id + '.jpg')
                        });
                    } else {
                        this.props.history.push('/');
                    }
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
                billboard: {
                    name: '喜欢的音乐',
                    comment: '喜欢的音乐列表！',
                    update_date: '今天'
                },
                img: require('../../images/' + 18 + '.jpg')
            });
        } else {
            this.props.history.push('/');
        }
    }
    render() {
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
                            <MusicList song_listArr={this.state.song_listArr} id={this.props.match.params.id}/>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </div>
            </div>
        )
    }

}

export default MusicTypePage;