var fetch = require('isomorphic-fetch');
var rootUrl = 'http://api.openweathermap.org/';
var apiKey = '8974d6ce169b6c0bb6c4825a64bde061';

module.exports = {
  get: function(url) {
    return fetch(rootUrl + url + "&APPID=" + apiKey)
      .then(function(response) {
        return response.json();
    });
  },
  getCityData: function(city_id) {
    return this.get('data/2.5/weather?id=' + city_id);
     // .then(function(json){ return (9/5*(json.main.temp - 273) + 32)});
  }
};
