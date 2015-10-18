var React = require('react');

var Radiator = React.createClass({
  applyHeat: function(btu_hr) {
    this.props.environmentHandler(btu_hr)
    this.setState({
      duration: duration + 1
    });
    console.log("Radiator has been on for " + this.state.duration + " seconds.")
  },
  getInitialState: function() {
    return {
      duration: 0
    }
  },
  componentWillUnmount: function() {
    this.applyHeat = function() {
      return;
    }
  }
  evenSeconds: function() {
    var even = (this.state.duration%2 = 0 ? true : false);
    // console.log("Even is " + even);
    return even;
  },
  render: function() {
    return (
    <div className={"panel panel-default radiator" + (this.evenSeconds() ? "grooved" : "ridged")}>
      Radiator <br />
    Intensity: {this.props.btu_hr} BTU/hr
    <Timer trigger={this.applyHeat} args={[this.props.btu_hr]} interval="1" />
    </div> )
  }

});

module.exports = Radiator;
