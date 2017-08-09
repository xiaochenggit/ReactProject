import 'antd/dist/antd.css';
import '../styles/App.css';
import React from 'react';
import Header from './header/';
import ProgressPage from './progressPage/';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Header />
        <ProgressPage />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
