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
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange (x, y) {
    this.setState({ value: y })
  }

  handleInputChange (e) {
   this.setState({ value: e.target.value }) 
  }

  render () {
    return (
      <div className={appStyles.app}>
        <Dial
          radius={ 140 }
          border={ 70 }
          value={ this.state.value }
          onChange={ this.handleChange } />
        <input type="number" value={parseFloat(this.state.value)} min="0" max="1" step=".01" onChange={this.handleInputChange} />
      </div>
    );
  }
}

export default App;
