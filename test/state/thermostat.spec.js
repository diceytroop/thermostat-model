import React from 'react';

import expect from 'expect';
import _ from 'underscore';

import * as ThermostatActions from '../../src/actions/thermostat.js';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import reducer, { default_state } from '../../src/reducers/thermostat';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Thermostat State', function() {

  describe('Thermostat Actions', function() {

    describe('ThermostatActions.radiatorOn()', function() {

      it('should dispatch RADIATOR_ON', function() {

        const expectedActions = [{
          type: ThermostatActions.RADIATOR_ON
        }]

        const store = mockStore({thermostat: default_state});
        store.dispatch(ThermostatActions.radiatorOn());
        expect(store.getActions()).toEqual(expectedActions);

      });

    });

    describe('ThermostatActions.radiatorOff()', function() {

      it('should dispatch RADIATOR_OFF', function() {

        const expectedActions = [{
          type: ThermostatActions.RADIATOR_OFF
        }]

        const store = mockStore({thermostat: default_state});
        store.dispatch(ThermostatActions.radiatorOff());
        expect(store.getActions()).toEqual(expectedActions);

      });

    });

    describe('ThermostatActions.measureTemp()', function() {

      it('should dispatch MEASURE_TEMP then SET_MEASURED_TEMP then REACT_TO_TEMP then RADIATOR_ON if temp is below threshhold', function() {

        const expectedActions = [{ type: ThermostatActions.MEASURE_TEMP},
                                 { type: ThermostatActions.SET_MEASURED_TEMP,
                                   newTemp: 40},
                                 { type: ThermostatActions.REACT_TO_TEMP},
                                 { type: ThermostatActions.RADIATOR_ON}]

        const store = mockStore({ radiator: { on: false },
                                  building: { temperature: 40 },
                                  thermostat: default_state });
        store.dispatch(ThermostatActions.measureTemp());
        expect(store.getActions()).toEqual(expectedActions);

      });

    });

    describe('ThermostatActions.setThreshhold(newTemp)', function() {

      it('should dispatch SET_THRESHHOLD', function() {

        const expectedActions = [{ type: ThermostatActions.SET_THRESHHOLD, newTemp: 62 }];

        const store = mockStore({thermostat: default_state});
        store.dispatch(ThermostatActions.setThreshhold(62));
        expect(store.getActions()).toEqual(expectedActions);

      });

    });

  });

  describe('Thermostat Reducer', function() {

    it('initializes at the default state', function() {
      expect(reducer(undefined, {})).toEqual(default_state);
    });

    it('handles SET_MEASURED_TEMP', function() {

      var new_state = Object.assign({}, default_state, {
        last_measured_temp: 40
      });

      expect(reducer(default_state, {
        type: ThermostatActions.SET_MEASURED_TEMP,
        newTemp: 40
      })).toEqual(new_state);

    });

    it('handles SET_THRESHHOLD', function() {

      var new_state = Object.assign({}, default_state, {
        threshhold: 60
      });

      expect(reducer(default_state, {
        type: ThermostatActions.SET_THRESHHOLD,
        newTemp: 60
      })).toEqual(new_state);


    });

  });

});
