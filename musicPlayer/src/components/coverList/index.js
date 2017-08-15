// 音乐分类列表页面

import React , { Component } from 'react';
import Cover from './cover';
import Header from '../header/';
import { Row, Col, Card, Icon } from 'antd';
import './style.css';

class CoverList extends Component {

    constructor() {
        super();
        this.state = {
            list: []
        }
    }
    componentWillMount() {
        // 获得分类列表的 json 文件  
        let fetchOptions = {methods: 'GET'};
        fetch('/js/coverList.json',fetchOptions).then(res => res.json())
        .then(list =>{
            this.setState({
                list
            })
        });
    }
    render() {
        let list = this.state.list;
        let listHTML = list.length ?
        list.map((item, index) =>
            <Cover {...item} key={index} width='calc((100% / 4) - 2rem)'/>
        )
        : '暂无数据';
        return(
            <div className='main'>
                {/*公共头部  */}
                <Header/>
                {/*列表部分  */}
                <div className="coverList">
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <Card title="热门推荐"  bordered={false}>
                                <div>
                                    {listHTML}
                                </div>
                            </Card>              
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default CoverList;