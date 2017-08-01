import React , { Component } from 'react';
import {Carousel} from 'antd';
import './style.css';
const bannerImg = require('../../../img/2.jpg');

class Banner extends Component {
    render() {
        return (
            <Carousel autoplay style={{width:'100%'}} className='banner'>
                <div>
                    <a href='http://www.baidu.com' target='_blank' rel="noopener noreferrer">
                        <img src={bannerImg} alt='bannerimg'></img>
                    </a>
                </div>
                <div>
                    <a href='http://www.baidu.com' rel="noopener noreferrer">
                        <img src={bannerImg} alt='bannerimg'></img>
                    </a>
                </div>
                <div>
                    <a href='http://www.baidu.com' rel="noopener noreferrer">
                        <img src={bannerImg} alt='bannerimg'></img>
                    </a>
                </div>
                <div>
                    <a href='http://www.baidu.com' rel="noopener noreferrer">
                        <img src={bannerImg} alt='bannerimg'></img>
                    </a>
                </div>
            </Carousel>
        )
    }
}
export default Banner;