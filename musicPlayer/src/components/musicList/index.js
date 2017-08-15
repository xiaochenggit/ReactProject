import React , { Component } from 'react';
import { Row, Col , Card , Pagination} from 'antd';
import Header from '../header/';
import './index.css';
class MusicList extends Component {
    constructor() {
        super();
        this.state = {
            song_listArr: [],
            pageSize: 10,
            pageIndex: 1,
            Jumper: false,
            img: '',
            song_list: [],
            billboard: '',
            search: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type='
        }
    }
    onChange(pageNumber) {
        this.setState({
            pageIndex: pageNumber,
            song_list: this.state.song_listArr.slice((pageNumber - 1) * this.state.pageSize , pageNumber * this.state.pageSize)
        })
    }
    componentDidMount() {
        // $.ajax({
        //     url: 'http://s.music.163.com/search/get/',
        //     dataType:'jsonp',
        //     data: {
        //     'type': 1,
        //     's': '意外',
        //     'limit': 20
        //     },
        //     jsonp: 'callback',
        //     cache: false,
        //     success: function(data) {
        //     console.log(data)
        //     }
        // });
        let id = this.props.match.params.id;
        let pageIndex = 1;
        if (id != '0') {
             console.log('2');
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
        } else {
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
    }
    render() {
        let musicGroupHTML = this.state.song_list.length ?
        this.state.song_list.map((item,index) =>
            <Card key={index}>
                <Row>
                    <Col span={6}>
                        <img src={item.pic_small} alt={item.title}/>
                        {item.title}
                    </Col>
                    <Col span={6}>{item.artist_name}</Col>
                    <Col span={6}>{item.album_title || '本地'}</Col>
                    <Col span={6}>下载添加</Col>
                </Row>
            </Card>
        )
        : '暂无数据';
        return(
            <div className='main'>
                <Header />
                <div className='musicList'> 
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div className='musicListTop'>
                            <img src={this.state.img} alt={this.state.billboard.name}/>
                            <div className='musicListdes'>
                                <h2>{this.state.billboard.name}</h2>
                                <p>{this.state.billboard.comment}</p>
                                <p>{this.state.billboard.update_date}</p>
                            </div>
                        </div>
                        <div className='musicGroup'>
                            {musicGroupHTML}
                        </div>
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