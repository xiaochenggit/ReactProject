import 'antd/dist/antd.css';
import '../styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Music from './music/';
import CoverList from './coverList/';
import MusicList from './musicList';
class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Router>
          <div>
            <Route exact path="/" component={CoverList}>
            </Route>
            <Route path="/list/:id" component={MusicList}/>
          </div>
        </Router>
        <Music />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
