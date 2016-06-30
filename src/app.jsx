import { render } from 'react-dom';
import React from 'react';
import { Router, Route } from 'react-router';
import HashHistory from 'react-router/lib/hashhistory';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from './store/configureStore.js';
var store = configureStore();


import App from './containers/App.jsx';

console.log("Store state:", store.getState());

//var element = React.createElement(Hello, {});
render((
  <Provider store={store}>
    <Router history={HashHistory}>
      <Route path="/" component={App}>

      </Route>
    </Router>
  </Provider>
), document.querySelector('.container'));
