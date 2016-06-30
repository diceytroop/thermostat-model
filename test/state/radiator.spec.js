import React from 'react';

import expect from 'expect';
import _ from 'underscore';

import * as RadiatorActions from '../../src/actions/radiator';
import * as ThermostatActions from '../../src/actions/thermostat';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import reducer, { default_state } from '../../src/reducers/radiator'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Radiator State', function() {

  describe('Radiator Actions', function() {

    describe('RadiatorActions.setBTUs()', function() {

      it('should dispatch RadiatorActions.SET_BTUS', function() {

        const newBTUs = 5000

        const expectedActions = [{
          type: RadiatorActions.SET_BTUS,
          newBTUs
        }]

        const store = mockStore({radiator: default_state});
        store.dispatch(RadiatorActions.setBTUs(newBTUs));
        expect(store.getActions()).toEqual(expectedActions);

      });

    });

  });

  describe('Radiator Redux', function() {

    it('initializes with default state', function() {
      expect(reducer(undefined, {})).toEqual(default_state);
    });

    it('handles ThermostatActions.RADIATOR_ON', function() {

      var new_state = Object.assign({}, default_state, {
        on: true
      });

      expect(reducer(default_state, {
        type: ThermostatActions.RADIATOR_ON
      })).toEqual(new_state);

    });

    it('handles ThermostatActions.RADIATOR_OFF', function() {

      var new_state = Object.assign({}, default_state, {
        on: false
      });

      expect(reducer(default_state, {
        type: ThermostatActions.RADIATOR_OFF
      })).toEqual(new_state);

    });

    it('handles RadiatorActions.SET_BTUS', function() {

      var new_state = Object.assign({}, default_state, {
        BTUs: 5000
      });

      expect(reducer(default_state, {
        type: RadiatorActions.SET_BTUS,
        newBTUs: 5000
      })).toEqual(new_state);

    });

  });


});
