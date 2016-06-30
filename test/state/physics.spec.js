import React from 'react';

import { expect } from 'chai';
import expect_alt from 'expect';
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

        expect(PhysicsActions.degreesFChangeOverInterval(btu, ms, mass, heat_capacity)).to.equal(2.0744350929258584);
    });

  });

  describe('massOfAirInBuilding(building)', function() {

    it('should accept a valid building state and return a mass of air', function() {

      expect(PhysicsActions.massOfAirInBuilding(default_building)).to.equal(35.112832);
      //TODO: incorporate changes in density by current temperature

    });

  });

  describe('wallQ(wall, getstate) ', function() {

    it('should return BTU/hr rate of transfer given conditions', function() {
        const storeState = {
         building: default_building,
         environment: default_environment,
         radiator: default_radiator,
         physics: default_state
       }

      var wall = default_building.west;
      wall.conductivity = 0.05502682125; // W/mC
      wall.inside_convection = 1.5; // BTU/h-ft2-F
      wall.in_thick = 6;
      wall.height = 80;
      wall.length = 2;

      storeState.building.temperature = 70;
      storeState.environment.temperature = -10;
      storeState.environment.outside_convection = 6;

      const store = mockStore(storeState);

      expect(PhysicsActions.wallQ(wall, store.getState)).to.equal(773.105413105413);
    });

  });

  describe('tempInfluenceOfWallPerHour(wall, getState)', function() {

    it('should return the correct temperature influence given the provided wall and environment state', function() {

      const storeState = {
         building: default_building,
         environment: default_environment,
         radiator: default_radiator,
         physics: default_state
      }

      var wall = default_building.west;
      wall.conductivity = 0.05502682125; // W/mC
      wall.inside_convection = 1.5; // BTU/h-ft2-F
      wall.in_thick = 6;
      wall.height = 80;
      wall.length = 2;

      storeState.building.temperature = 70;
      storeState.environment.temperature = -10;
      storeState.environment.outside_convection = 6;

      const store = mockStore(storeState);
      expect(PhysicsActions.tempInfluenceOfWallPerHour(wall, store.getState)).to.be.closeTo(-3.2, 0.1);
    });
  });

  describe('tempInfluenceOfWallsSinceUpdate(getState)', function() {

    it('should return temperature influence of all walls per given time period in ms', function() {

      var building = { temperature: 70 };
      var walls = ['west', 'north', 'south', 'east', 'roof'];

      _.map(walls, function(wall) {
          building[wall] = {};
          building[wall].conductivity = 0.05502682125; // W/mC
          building[wall].inside_convection = 1.5; // BTU/h-ft2-F
          building[wall].in_thick = 6;
          building[wall].height = 80;
          building[wall].length = 2;
      });

      const storeState = {
         building,
         environment: default_environment,
         radiator: default_radiator,
         physics: default_state
      }

      storeState.environment.temperature = -10;
      storeState.environment.outside_convection = 6;
      storeState.physics.last_applied = new Date() - 3600000;

      var ms_since_update = 3600000
      const store = mockStore(storeState);
      expect(PhysicsActions.tempInfluenceOfWallsSinceUpdate(store.getState, ms_since_update)).to.be.closeTo(-16, 0.6);


    });

  });

});

describe('Physics State', function() {

  describe('Physics Actions', function() {

    describe('PhysicsActions.applyThermodynamics()', function() {

      it('should dispatch APPLY_THERMODYNAMICS with correct changes based on time + variables when radiator is off', function() {

          const expectedActions = [{
            type: PhysicsActions.APPLY_THERMODYNAMICS,
            newInsideTemp: 53.89363722697056,
            msSinceUpdate: 3600000
          }];

          var building = { temperature: 70 };
          var walls = ['west', 'north', 'south', 'east', 'roof'];

          _.map(walls, function(wall) {
              building[wall] = {};
              building[wall].conductivity = 0.05502682125; // W/mC
              building[wall].inside_convection = 1.5; // BTU/h-ft2-F
              building[wall].in_thick = 6;
              building[wall].height = 80;
              building[wall].length = 2;
          });

          const storeState = {
             building,
             environment: default_environment,
             radiator: default_radiator,
             physics: default_state
          }

          storeState.environment.temperature = -10;
          storeState.environment.outside_convection = 6;
          storeState.physics.last_applied = new Date() - 3600000;

          const store = mockStore(storeState);

          store.dispatch(PhysicsActions.applyThermodynamics());
          expect_alt(store.getActions()).toEqual(expectedActions);

      });

      it('should dispatch APPLY_THERMODYNAMICS with the correct changes based on time + variables when radiator is on', function() {

        const expectedActions = [{
          type: PhysicsActions.APPLY_THERMODYNAMICS,
          newInsideTemp: 71.14007570268164,
          msSinceUpdate: 60000
        }];

        var building = { temperature: 70 };
        var radiator = { on: true, BTUs: 500 };
        var walls = ['west', 'north', 'south', 'east', 'roof'];

        _.map(walls, function(wall) {
            building[wall] = {};
            building[wall].conductivity = 0.05502682125; // W/mC
            building[wall].inside_convection = 1.5; // BTU/h-ft2-F
            building[wall].in_thick = 6;
            building[wall].height = 80;
            building[wall].length = 2;
        });

        const storeState = {
           building,
           environment: default_environment,
           radiator,
           physics: default_state
        }

        storeState.environment.temperature = -10;
        storeState.environment.outside_convection = 6;
        storeState.physics.last_applied = new Date() - 60000;

        const store = mockStore(storeState);

        store.dispatch(PhysicsActions.applyThermodynamics());
        expect_alt(store.getActions()).toEqual(expectedActions);

      });

    });

  });

  describe('Physics reducer', function() {

    it('initializes to the default state', function() {
      expect_alt(reducer(undefined, {})).toEqual(default_state)
    });

    it('handles APPLY_THERMODYNAMICS', function() {

      var date = new Date();

      expect_alt(reducer({ last_applied: Date.parse(date) },
          { type: PhysicsActions.APPLY_THERMODYNAMICS,
            newInsideTemp: 72,
            msSinceUpdate: 60000 })).toEqual({ last_applied: Date.parse(date) + 60000 });

    });

  });

});
