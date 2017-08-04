import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header/';
import Footer from './footer/';
import DetailNew from './detailNew/';
import Nav from './nav/';
import UserCenter from './userCenter/';

class MobileIndex extends Component {
    render() {
        return(
            <div className='mobile'>
                <Header/>
                <Router>
                    <div>
                        <Route exact path="/" component={Nav}/>
                        <Route path="/detail/:uniquekey" component={DetailNew}/>
                        <Route path="/usercenter" component={UserCenter}/>
                    </div>
                </Router>
                <Footer/>
            </div>
        )
    }
}

export default MobileIndex;