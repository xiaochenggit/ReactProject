import React, { Component } from 'react';
import Header from './header/';
import Footer from './footer/';
import Nav from './nav/';

class MobileIndex extends Component {
    render() {
        return(
            <div className='mobile'>
                <Header/>
                <Nav/>
                <Footer/>
            </div>
        )
    }
}

export default MobileIndex;