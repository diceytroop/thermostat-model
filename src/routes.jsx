import React from 'react';
import { Router, Route, Provider } from 'react-router';
import HashHistory from 'react-router/lib/hashhistory';

import { createStore } from 'redux';
import configureStore from './store/configureStore.js';
import ReactDOM from 'react-dom';

import App from './containers/App.jsx';
console.log(App);

var store = createStore(configureStore);

export default ReactDOM.render (
  <Provider store={store}>
    <Router history={HashHistory}>
      <Route path="/" component={App}>

      </Route>
    </Router>
  </Provider>
);
