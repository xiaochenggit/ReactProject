import React , { Component } from 'react';
import './style.css';
class Footer extends Component {
    constructor() {
        super();
        this.state = {
            year: new Date().getFullYear()
        }
    }
    render() {
        return (
            <footer className='mobileFooter'>
                <p>&copy;{this.state.year}&nbsp;Headlines xionganrc.shop  京ICP备 xxxx号-2</p>
            </footer>
        )
    }
}

export default Footer;