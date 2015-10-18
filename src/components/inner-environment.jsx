var React = require('react');
var Timer = require('./timer.jsx');

var Radiator = React.createClass({
  getInitialState: function() {
    return {
      duration: 0
    }
  },
  applyHeat: function(btu_hr) {
    this.props.environmentHandler(btu_hr)
    this.setState({
      duration: this.state.duration + 1
    });
    // console.log("Radiator has been on for " + this.state.duration + " seconds.")
  },
  evenSeconds: function() {
    var even = false;
    if (this.state.duration %2 == 0) {
      even = true;
    } else {
      even = false;
    }
    //console.log("Even is " + even);
    return even;
  },
  render: function() {
    return (
    <div className={"panel panel-default radiator " + (this.evenSeconds() ? "grooved" : "ridged")}>
    <h5>This is the radiator.</h5>
    Intensity: {this.props.btu_hr} BTU/hr <br/>
    On for {this.state.duration} seconds.
    <Timer trigger={this.applyHeat} args={[this.props.btu_hr]} interval="1" />
    </div> )
  }

});


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

      var renderOnText = function() {
        return <span className="ontext">on</span>
      }

      return <div className="panel panel-default thermostat">
        <h5>This is the Thermostat.</h5>
        It last sensed temp of {this.state.sensed_temperature} degrees F. <br />
      <Timer trigger={this.senseTemperature} args={null} interval="10"/>
      Desired temperature is {this.state.desired_temperature};

      Radiator is {this.state.radiator_on ? renderOnText() : "off"}.
        {this.state.radiator_on ? this.renderRadiator() : ""}

      </div>
    },
    renderRadiator: function() {
      return (<Radiator environmentHandler={this.props.handler} btu_hr={this.state.radiator_btu_hr} />)
    }
});


module.exports = React.createClass({
  getInitialState: function() {
    return {
      last_update: new Date(),
      inside_temperature: 64,
      outside_temperature: this.props.temperature,
      wall_thickness_inches: this.props.wall_thickness || 3,
      room_height: this.props.room_height || 10,
      room_length: this.props.room_length || 10,
      room_width: this.props.room_width || 10,
      inside_convection: this.props.inside_convection || 1.5,
      outside_convection: this.props.outside_convection || 6,
      wall_convection: this.props.wall_convection || 0.0318,
      btu_per_hour: 0
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.applyThermodynamics(nextProps.temperature);
  },
  applyThermodynamics: function() {
    var area = (2*(this.state.room_width * this.state.room_height) + //AREA
                2*(this.state.room_length * this.state.room_height)) +
                (this.state.room_length * this.state.room_width);
    var top_of_equation = area * (this.state.inside_temperature - this.state.outside_temperature);
    var bottom_of_equation = (1 / this.state.inside_convection) +
                             (this.state.wall_thickness_inches / this.state.wall_convection) +
                             (1 / this.state.outside_convection);
    var btu_per_hour = top_of_equation / bottom_of_equation;
    var new_temp = this.state.inside_temperature -
                   ((btu_per_hour / (3600000/(new Date() - this.state.last_update))) /
                    (this.state.inside_convection * area))
    this.setState({
      inside_temperature: new_temp,
      btu_per_hour: btu_per_hour
    });
  },
  handleHeatFromChild: function(btu_hr) {
    var volume = this.state.room_height * this.state.room_length * this.state.room_width;
    this.setState({
      inside_temperature: this.state.inside_temperature + ((btu_hr/3600) / (20.45 * 10))
        });
    console.log("temperature increased by radiator by " + (btu_hr/3600 / 20.45 * 10));
  },
  render: function() {
    var that = this;
    return <div className="panel panel-default inner-environment">
      <h5>This is the room being climate-controlled. </h5>
    The dimensions are {this.state.room_height}ft tall x {this.state.room_length}ft long x {this.state.room_width}ft wide. <br />
  The walls and roof are {this.state.wall_thickness_inches} inches thick. <br />
The heat loss through the walls and roof is {this.state.btu_per_hour} BTU/hr. <br />
    The actual current temperature indoors is {this.state.inside_temperature} degrees F.
        <Timer trigger={that.applyThermodynamics} interval="5" />
      <Thermostat temperature={this.state.inside_temperature} handler={this.handleHeatFromChild} />

          </div>
  }

});
//
