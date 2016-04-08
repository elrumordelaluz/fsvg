import React, { Component } from 'react';

class Dial extends Component {
  constructor (props) {
    super(props);

    this.state = {
      inUse: false
    }
  }

  componentDidMount () {
    this.x = 0;
    this.y = 0;
  }

  render () {
    return (
      <svg className="Dial"ref={ (knob) => this.knob = knob } >
        <circle className="Dial-total" />
        <circle className="Dial-quantity" />
      </svg>
    );
  }
}

export default Dial;
