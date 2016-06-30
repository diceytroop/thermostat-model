import React, { Component } from 'react'

class Thermostat extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <div className="thermostat">
      Thermostat last sensed temp of {this.props.last_measured_temp} degrees F. <br />
    Desired temperature is {this.props.threshhold}.
    </div>
  }

};

export default Thermostat;
