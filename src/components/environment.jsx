import React, { Component } from 'react';

class Environment extends Component {

  render() {
    return (
    <div className="panel panel-default environment">
      <h4>This is the outdoors in Fairbanks, Alaska, right now.</h4>
      The current temperature is {this.props.temperature} degrees F.
      {this.props.children}
    </div>
    )
  }
};

//
module.exports = Environment;
