import React from 'react';
import addons from 'react/addons';
import expect from 'expect';
import _ from 'underscore';

import * as BuildingActions from '../../src/actions/building.js';

import configureStore from 'redux-mock-store';
import reducer from '../../src/reducers/building.js';

var default_state = {

  east: {
    in_thick: 3,
    height: 10,
    length: 10,
    width: 10,
    inside_convection: 1.5,
    outside_convection: 6,
    wall_convection: 0.0318
  },
  west: {
    in_thick: 3,
    height: 10,
    length: 10,
    width: 10,
    inside_convection: 1.5,
    outside_convection: 6,
    wall_convection: 0.0318
  },
  north: {
    in_thick: 3,
    height: 10,
    length: 10,
    width: 10,
    inside_convection: 1.5,
    outside_convection: 6,
    wall_convection: 0.0318
  },
  south: {
    in_thick: 3,
    height: 10,
    length: 10,
    width: 10,
    inside_convection: 1.5,
    outside_convection: 6,
    wall_convection: 0.0318
  },
  roof: {
    in_thick: 3,
    height: 10,
    length: 10,
    inside_convection: 1.5,
    outside_convection: 6,
    wall_convection: 0.0318
  }
}

describe('Building State', function() {

  describe('Building Actions', function() {

    before('Set up base state', function() {
      const store = configureStore();
      this.store = store;
    });

    describe('BuildingActions.changeWallProperty construction', function() {
      it('should dispatch CHANGE_WALL_PROPERTY()', function(done) {

        const changeRequest = {
          wall: 'west',
          property: 'height',
          new_val: '11'
        }

        console.log(BuildingActions);

        const expectedActions = [{
          type: BuildingActions.CHANGE_WALL_PROPERTY,
          wall: 'west',
          property: 'height',
          new_val: '11'
        }]

        const store = mockStore(default_state, expectedActions, done);
        store.dispatch(BuildingActions.changeWallProperty(changeRequest));

      });


    });

  });

});
