import React , { Component } from 'react';
import './style.css';
const logo = require('../../../img/logo.png');

class Header extends Component {
    render() {
        return(
            <header className='mobileheader'>
                <a href='/' className='logo'>
                    <img src={logo} alt='logo'></img>
                    <span>Headlines</span>
                </a>
            </header>
        )
    }
}
export default Header;