import React, { Component } from 'react';
import appStyles from './app.scss';

import Dial from './Dial';

class App extends Component {
  constructor () {
    super();

    this.state = {
      value: .6
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (x, y) {
    this.setState({ value: y })
  }
  render () {
    return (
      <div className={appStyles.app}>
        <Dial
          radius={ 140 }
          border={ 70 }
          value={ this.state.value }
          onChange={ this.handleChange } />
        <p>{ this.state.value.toFixed(2) }</p>
      </div>
    );
  }
}

export default App;
