import React, { Component } from 'react';

import PcIndex from './components/pc/';
import MobileIndex from './components/mobile/';

var MediaQuery = require('react-responsive');
class App extends Component {
  render() {
    return (
      <div className='main'>
        <MediaQuery query='(min-device-width: 1224px)'>
          <PcIndex/>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <MobileIndex/>
        </MediaQuery>
      </div>
    );
  }
}

export default App;
