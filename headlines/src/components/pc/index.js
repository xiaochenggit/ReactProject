import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header/';
import Footer from './footer/';
import NewsContainer from './newsContainer/';
import DetailNew from './detailNew/';
import UserCenter from './userCenter/';

class PcIndex extends Component {
    render() {
        return(
            <div className='pc'>
                <Header/>
                <Router>
                    <div>
                        <Route exact path="/" component={NewsContainer}/>
                        <Route path="/detail/:uniquekey" component={DetailNew}/>
                        <Route path="/usercenter" component={UserCenter}/>
                    </div>
                </Router>
                <Footer/>
            </div>
        )
    }
}

export default PcIndex;