import React from 'react';
import addons from 'react/addons';
import expect from 'expect';
import _ from 'underscore';

import * as PhysicsActions from '../../src/actions/physics';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import reducer, { default_state } from '../../src/reducers/physics';

// needed components of other action creators / reducers
import {default_state as default_building} from '../../src/reducers/building';
import {default_state as default_radiator} from '../../src/reducers/radiator';
import {default_state as default_environment} from '../../src/reducers/environment';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('Physics helper functions', function() {

  describe('Heat transfer coefficient', function() {
    // ṁ = fluid mass flow rate (kg/s)
    // m = mass of air
    // Cp = specific heat capacity of fluid (J/kg-K) = 0.239 kcal/deg-C.
    // Text = external temperature (reference temp for liquid, K)
    // Taird = temperature downstream from the heat exchanger (K)
    // A = heat exchanger frontal area
    // h = heat transfer coefficient.
    // DeltaE = added heat
    //
    // http://www.polydynamics.com/heat_transfer_revised.pdf
    //
    //  delta E / m * Cp = degrees C change /min.
    //
    //  So, for a room that is 10x10x10, there are 1000ft^3 of air = 28.3168m^3.
    //  Assume density is 1.24kg/m^3.
    //  Mass of air in the room is 1.24 * 28.3168 = 35.112832kg.
    //  so m * Cp is: 35.112832kg * .239kcal/degC, or 8.391966848kcal/degC.
    //  So the actual change over time is x kcal/min / 8.391966848kcal/degC = degC/min.
  });

  describe('degreesFChangeOverInterval(btu, ms, mass, capacity)', function() {

    it('should accept btu (/hr), ms, mass (kg), capacity (kcal/degC) and return degrees F change over interval', function() {

        var btu = 12372.9;
        var ms = 60000; // (1 min)
        var mass = 188.79;
        var heat_capacity = 0.239;

        expect(PhysicsActions.degreesFChangeOverInterval(btu, ms, mass, heat_capacity)).toEqual(2.0744350929258584);
    });

  });

  describe('massOfAirInBuilding(building)', function() {

    it('should accept a valid building state and return a mass of air', function() {

      expect(PhysicsActions.massOfAirInBuilding(default_building)).toEqual(35.112832);
      //TODO: incorporate changes in density by current temperature

    });

  });

  describe('heatLossFromWall(wall, ms_since_last_update, getState)', function() {

    it('should return the heat lost via one wall, in BTU, over given time (ms)', function() {

      const storeState = {
         building: default_building,
         environment: { ...default_environment, temperature: 50},
         radiator: default_radiator,
         physics: default_state
       }

      const store = mockStore(storeState);

      var wall = default_building.west;
      var ms = 100;
      expect(PhysicsActions.heatLossFromWall(wall, ms, store.getState)).toEqual(0.1637109316);

    });

  });


  // describe('heatLossFromWalls(getState, ms_since_last_update)', function() {
  //
  //   it('should calculate the heat loss based on the building, environment, and time.')
  //
  //   const store = mockStore({building: default_building, environment: { ...default_environment, temperature: 50 },radiator: default_radiator, physics: default_state});
  //
  //   expect(PhysicsActions.heatLossFromWalls(store.getState(), (new Date() - (store.getState().physics.last_applied - 60000))
  // )).toEqual(2.0744350929258584)
  //
  // });

});

describe('Physics State', function() {

  describe('Physics Actions', function() {

    describe('PhysicsActions.applyThermodynamics()', function() {

      it('should dispatch APPLY_THERMODYNAMICS with correct changes based on time + variables', function() {

          const expectedActions = [{
            type: PhysicsActions.APPLY_THERMODYNAMICS,
            newInsideTemp: 67
          }];

          const store = mockStore({building: default_building, environment: default_environment,radiator: default_radiator, physics: default_state});
          store.dispatch(PhysicsActions.applyThermodynamics());
          expect(store.getActions()).toEqual(expectedActions);

      });

    });

  });

});
