import React, { Component } from 'react';

import styles from './Dial.css';

class Dial extends Component {
  constructor (props) {
    super(props);

    this.state = {
      inUse: false
    }

    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
  }

  componentDidMount () {
    this.x = 0;
    this.y = 0;

    document.addEventListener("mousemove", this.mouseMove)
    document.addEventListener("mouseup", this.mouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.mouseMove)
    document.removeEventListener("mouseup", this.mouseUp)
  }

  mouseUp () {
    this.setState({
      inUse: false
    })
  }

  mouseDown (event) {
    event.preventDefault();

    const { left, top, width, height } = this.knob.getBoundingClientRect();

    this.x = event.pageX - (left + width / 2);
    this.y = (top + height / 2) - event.pageY;

    this.setState({
      inUse: true
    })
  }

  mouseMove (event) {
    if (this.state.inUse) {
      const { left, top, width, height } = this.knob.getBoundingClientRect();
      const x = event.pageX - (left + width / 2);
      const y = (top + height / 2) - event.pageY;
      const dx = (x - this.x) / 100;
      const dy = (y - this.y) / 100;
      this.x = x;
      this.y = y;

      if (this.props.onChange) {
        let xValue = this.props.value + dx;
        let yValue = this.props.value + dy;

        if (xValue < 0) {
          xValue = 0;
        }

        if (xValue > 1) {
          xValue = 1;
        }

        if (yValue < 0) {
          yValue = 0;
        }

        if (yValue > 1) {
          yValue = 1;
        }

        this.props.onChange(xValue, yValue)
      }
    }
  }

  render () {
    const { radius, border, value, colors } = this.props;
    const p = 2 * Math.PI * (radius - border / 2);

    const strokeWidth = border;
    const strokeDashoffset = p * (1 - value);
    const strokeDasharray = p;

    let totalColor, qColor;
    if (colors) {
      totalColor = colors.length ? colors[0] : null;
      qColor = colors.length > 1 ? colors[1] : null;
    }

    return (
      <svg
        className={styles.Dial}
        ref={ knob => this.knob = knob }
        viewBox={ `0 0 ${ radius * 2 } ${ radius * 2 }` }
        onMouseDown={ this.mouseDown }>
        <circle
          className={styles.DialTotal}
          style={{ strokeWidth, stroke: totalColor }}
          r={ radius - border / 2 }
          cx={ radius }
          cy={ radius } />
        <circle
          className={styles.DialQ}
          style={{
            strokeWidth,
            strokeDashoffset,
            strokeDasharray,
            stroke: qColor
          }}
          r={ radius - border / 2 }
          cx={ radius }
          cy={ radius } />
      </svg>
    );
  }
}

Dial.defaultProps = {
  radius: 50,
  border: 30,
  value: .5,
};

export default Dial;
