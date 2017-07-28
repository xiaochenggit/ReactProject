import React , { Component } from 'react';
import { Row, Col} from 'antd';
import './style.css';
class Footer extends Component {
    constructor() {
        super();
        this.state = {
            year: new Date().getFullYear()
        }
    }
    render() {
        return(
            <footer className='pcFooter'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <p>&copy;{this.state.year}&nbsp;Headlines xionganrc.shop  京ICP备 xxxx号-2</p>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </footer>
        )
    }

}

export default Footer;
