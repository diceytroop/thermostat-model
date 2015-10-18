var React = require('react');
var Radiator = require('./radiator.jsx');

var Thermostat = React.createClass({

    getInitialState: function() {
      return {
        radiator_on: false,
        radiator_btu_hr: this.props.radiator_btu_hr || 15000,
        sensed_temperature: this.props.temperature,
        last_sensed: new Date(),
        desired_temperature: this.props.desired_temperature || 65
      }
    },
    senseTemperature: function() {
      this.setState({
        sensed_temperature: this.props.temperature,
        last_sensed: new Date()
      });
      this.determineAction();
    },
    determineAction: function() {
      if (this.state.sensed_temperature < this.state.desired_temperature) {
        this.setState({
          radiator_on: true
        });
      } else {
        this.setState({
          radiator_on: false
        });
      }
    },
    render: function() {
      return <div className="panel panel-default">
        Thermostat last sensed temp of {this.state.sensed_temperature} degrees F. <br />
        Desired temperature is {this.state.desired_temperature}.
      <Timer trigger={this.senseTemperature} args={null} interval="30"/>
      Radiator is {this.state.radiator_on ? "on" : "off"}.
        {this.state.radiator_on ? this.renderRadiator() : ""}

      </div>
    },
    renderRadiator: function() {
      return (<Radiator environmentHandler={this.props.handler} btu_hr={this.state.radiator_btu_hr} />)
    }
});

module.exports = Thermostat;
