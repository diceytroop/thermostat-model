import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import promiseMiddleware from '../promiseMiddleware';

import DevTools from '../devtools.js';


const middlewareBuilder = () => {

  let middleware = {};
  let universalMiddleware = [thunk, promiseMiddleware];
  let allComposeElements = [];

  middleware = applyMiddleware(...universalMiddleware);
  allComposeElements = [
    middleware,
    DevTools.instrument()
  ]

  return allComposeElements;
}

const finalCreateStore = compose(...middlewareBuilder())(createStore);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  console.log(store.getState());

  return store;
}
