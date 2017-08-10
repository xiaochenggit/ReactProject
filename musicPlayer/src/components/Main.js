import 'antd/dist/antd.css';
import '../styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header/';
import ProgressPage from './progressPage/';
import CoverList from './coverList/';
import MusicList from './musicList';
class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Header />
        <Router>
          <div>
            <Route exact path="/" component={CoverList}/>
            <Route path="/list/:id" component={MusicList}/>
          </div>
        </Router>
        <ProgressPage />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
