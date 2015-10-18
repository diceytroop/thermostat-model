var React = require('react');

var Reflux = require('reflux');
var WeatherStore = require('../stores/weather-store.jsx');
var WeatherActions = require('../weather-actions.jsx');

var InnerEnvironment = require('./inner-environment.jsx');
var Timer = require('./timer.jsx');

var Environment = React.createClass({
  mixins: [
    Reflux.listenTo(WeatherStore, 'onTempChange')
  ],
  getInitialState: function() {
    return {
      temperature: 0,
      city_id: 5861897
    }
  },
  componentWillMount: function() {
    WeatherActions.getTemperature(this.state.city_id);
  },
  render: function() {
    return (
    <div className="panel panel-default environment">
      <h4>This is the outdoors in Fairbanks, Alaska, right now.</h4>
      The current temperature is {this.state.temperature} degrees F.
      <Timer trigger={WeatherActions.getTemperature} args={[this.state.city_id]} interval="30" />
      <InnerEnvironment temperature={this.state.temperature}/>

    </div>
  )
  },
  onTempChange: function(event, temperature) {
    this.setState({
      temperature: temperature
    });
  }
});

//
module.exports = Environment;
