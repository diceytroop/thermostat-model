var Fetch = require('whatwg-fetch');
var rootUrl = 'http://api.openweathermap.org/';
var apiKey = '8974d6ce169b6c0bb6c4825a64bde061';

module.exports = window.api = {
  get: function(url) {
    return fetch(rootUrl + url + "&APPID=" + apiKey)
      .then(function(response) {
        return response.json();
    });
  }
};
