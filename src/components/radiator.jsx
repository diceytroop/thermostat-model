import React, { Component } from 'react';

class Radiator extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
    <div className="radiator">
      Radiator {this.props.on ? "on" : "off"}<br />
    Intensity: {this.props.BTUs} BTU/hr
    </div> )
  }

};

export default Radiator;
