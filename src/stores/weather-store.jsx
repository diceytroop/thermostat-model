var WeatherApi = require('../utils/weather-api.jsx');
var Reflux = require('reflux');
var WeatherActions = require('../weather-actions.jsx');

module.exports = Reflux.createStore({
  listenables: [WeatherActions],
  getTemperature: function(city_id) {
    var that = this;
    WeatherApi.get('data/2.5/weather?id=' + city_id)
      .then(function(json) {
        that.temperature = (9/5*(json.main.temp - 273) + 32);
        console.log(that.temperature);
        that.triggerChange();
      });
  },
  triggerChange: function() {
    console.log(this.temperature);
    this.trigger('change', this.temperature);
  }
});
