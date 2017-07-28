import React, { Component } from 'react';
import Header from './header/';
import Footer from './footer/';
class PcIndex extends Component {
    render() {
        return(
            <div className='pc'>
                <Header/>
                <Footer/>
            </div>
        )
    }
}

export default PcIndex;