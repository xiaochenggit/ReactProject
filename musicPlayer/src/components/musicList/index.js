import React , { Component } from 'react';
import { Row, Col , Card} from 'antd';
import Paging from '../paging/';
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
        this.onChange = this.onChange.bind(this);
    }
    onChange(pageNumber) {
        this.setState({
            pageIndex: pageNumber,
            song_list: this.state.song_listArr.slice((pageNumber - 1) * this.state.pageSize , pageNumber * this.state.pageSize)
        })
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        let pageIndex = 1;
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
                    pageIndex,
                    song_listArr: data.song_list,
                    song_list: data.song_list.slice((pageIndex - 1) * this.state.pageSize , this.state.pageSize),
                    billboard: billboard,
                    img: require('../../images/' + id + '.jpg')
                });
            }
        });
    }
    render() {
        let state = this.state;
        let musicGroupHTML = state.song_list.length ? 
        state.song_list.map((item,index) => 
            <Card key={index}>
                <Row>
                    <Col span={6}>
                        <img src={item.pic_small} alt={item.title}/>
                        {item.title}
                    </Col>
                    <Col span={6}>{item.artist_name}</Col>
                    <Col span={6}>{item.album_title}</Col>
                    <Col span={6}>下载添加</Col>
                </Row>
            </Card>
        )
        : '暂无数据';
        return(
            <div className='musicList'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div className='musicListTop'>
                            <img src={state.img} alt={state.billboard.name}/>
                            <div className='musicListdes'>
                                <h2>{state.billboard.name}</h2>
                                <p>{state.billboard.comment}</p>
                                <p>{state.billboard.update_date}</p>
                            </div>
                        </div>
                        <div className='musicGroup'>
                            {musicGroupHTML}
                            <Paging showQuickJumper={this.state.Jumper} 
                                current={this.state.pageIndex}  
                                defaultPageSize={this.state.pageSize}
                                total={this.state.song_listArr.length} 
                                onChange={this.onChange} />
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }

}

export default MusicList;