import React, { Component } from 'react';
import Header from './header/';
import Footer from './footer/';
class MobileIndex extends Component {
    render() {
        return(
            <div className='mobile'>
                <Header/>
                <Footer/>
            </div>
        )
    }
}

export default MobileIndex;