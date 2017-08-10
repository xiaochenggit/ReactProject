import React , { Component } from 'react';
import { Row, Col } from 'antd';
import './style.css';
const logo = require('../../images/logo.png');
class Header extends Component {
    render() {
        return(
            <div className='header'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <a href='/'>
                            <img src={logo} alt='logo'/>
                            <h2>React Music Player</h2>
                        </a>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}

export default Header;