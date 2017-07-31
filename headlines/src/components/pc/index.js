import React, { Component } from 'react';

import Header from './header/';
import Footer from './footer/';
import NewsContainer from './newsContainer/';
class PcIndex extends Component {
    render() {
        return(
            <div className='pc'>
                <Header/>
                <NewsContainer/>
                <Footer/>
            </div>
        )
    }
}

export default PcIndex;