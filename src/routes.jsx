var React = require('react');
var ReactRouter = require('react-router');
var HashHistory = require('react-router/lib/hashhistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require('./components/weather-main.jsx');
var Environment = require('./components/environment.jsx');
var Timer = require('./components/timer.jsx');

module.exports =
(
  <Router history={new HashHistory}>
    <Route path="/" component={Environment}>
      // <Route path="topics/:id" component={Topic} />
      // <Route path="images/:id" component={ImageDetail} />
    </Route>
  </Router>
);
