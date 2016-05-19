import React from 'react';
import addons from 'react/addons';
import expect from 'expect';
import _ from 'underscore';
import nock from 'nock';

import * as EnvironmentActions from '../../src/actions/environment.js';

import thunk from 'redux-thunk';
import promiseMiddleware from '../../src/promiseMiddleware';
import configureStore from 'redux-mock-store';
import reducer, { default_state } from '../../src/reducers/environment';

var WeatherApi = require('../../src/utils/weather-api.jsx');

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

const sample_response = {
  "coord":{"lon":-73.95,"lat":40.65},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"cmc stations","main":{"temp":289.285,"pressure":1028.59,"humidity":46,"temp_min":289.285,"temp_max":289.285,"sea_level":1032.07,"grnd_level":1028.59},"wind":{"speed":2.01,"deg":127.5},"clouds":{"all":48},"dt":1463611951,"sys":{"message":0.005,"country":"US","sunrise":1463564098,"sunset":1463616610},"id":5110302,"name":"Brooklyn","cod":200
};

describe('Environment State', function() {

  describe('Environment Actions', function() {

    describe('EnvironmentActions.getCityData()', function() {
      // update temperature and name for current city id

      it('should dispatch GET_CITY_DATA_REQUEST and' +
         ' \n \t \t dispatch GET_CITY_DATA_SUCCESS on success', function(done) {

           var intercept = nock("http://api.openweathermap.org")
                        //  .persist()
                          .get("/data/2.5/weather?id=" + default_state.city_id + "&APPID=" + "8974d6ce169b6c0bb6c4825a64bde061")
                          .reply(200, sample_response)

           const expectedActions = [ /* { type: 'GET_CITY_DATA',
                                      promise: WeatherApi.getCityData(default_state.city_id) }, */
                                    { type: 'GET_CITY_DATA_REQUEST'},
                                    { type: 'GET_CITY_DATA_SUCCESS',
                                      req: sample_response }];
           const store = mockStore({environment: default_state});
           store.dispatch(EnvironmentActions.getCityData());
           setTimeout( function() {
                        expect(store.getActions())
                        .toEqual(expectedActions);
                        done() }, 20);
            intercept.done();
         });


    });

    describe('EnvironmentActions.setCityId construction', function() {

      it('should dispatch SET_CITY_ID action and' +
          '\n \t \t dispatch GET_CITY_DATA chain', function() {

        var intercept = nock("http://api.openweathermap.org")
                     //  .persist()
                       .get("/data/2.5/weather?id=" + default_state.city_id + "&APPID=" + "8974d6ce169b6c0bb6c4825a64bde061")
                       .reply(200, sample_response)

        const new_city_id = "5861897";

        const expectedActions = [{ type: EnvironmentActions.SET_CITY_ID,
                                   newCityId: new_city_id },
                                { type: 'GET_CITY_DATA_REQUEST'},
                                { type: 'GET_CITY_DATA_SUCCESS',
                                  req: sample_response }]

        const store = mockStore({environment: default_state});
        store.dispatch(EnvironmentActions.setCityId(new_city_id));
        setTimeout( function() {
          expect(store.getActions()).toEqual(expectedActions);
          done();}, 20);
        intercept.done();


      });


    });


  });

  describe('Environment reducer', function() {

    it('initializes with the default state', function() {

      expect(reducer(undefined, {})).toEqual(default_state);

    });

    it('handles SET_CITY_ID', function() {

      expect(reducer(default_state, {
        type: EnvironmentActions.SET_CITY_ID,
        newCityId: '1001'
      })).toEqual(Object.assign({}, default_state, {
        city_id: '1001'
      }))

    });

    it('handles GET_CITY_DATA_SUCCESS', function() {

      expect(reducer(default_state, {
        type: EnvironmentActions.GET_CITY_DATA+'_SUCCESS',
        req: sample_response
      })).toEqual( {
        city_id: "5110302",
        city_name: "Brooklyn",
        temperature: "61.313000000000045"
      });

    });


  });


});
