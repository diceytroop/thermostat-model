import React from 'react';
import addons from 'react/addons';
import expect from 'expect';
import _ from 'underscore';

import * as BuildingActions from '../../src/actions/building.js';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import reducer, { default_state } from '../../src/reducers/building';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Building State', function() {

  describe('Building Actions', function() {

    // before('Set up base state', function() {
    //   const store = configureStore();
    //   this.store = store;
    // });

    describe('BuildingActions.changeWallProperty construction', function() {
      it('should dispatch CHANGE_WALL_PROPERTY()', () => {

        const changeRequest = {
          wall: 'west',
          property: 'height',
          new_val: 11
        }

        const expectedActions = [{
          type: BuildingActions.CHANGE_WALL_PROPERTY,
          wall: 'west',
          property: 'height',
          new_val: 11
        }]

        const store = mockStore(default_state);
        store.dispatch(BuildingActions.changeWallProperty(changeRequest));
        expect(store.getActions()).toEqual(expectedActions);

      });


    });

  });

  describe('Building reducer', function() {

    it('initializes with the default state', function() {
      expect(reducer(undefined, {})).toEqual(default_state);
    });

    it('handles CHANGE_WALL_PROPERTY', function() {

      var new_state = Object.assign({}, default_state, {
        west: {
          ...default_state.west,
          height: 11
        }
      })

      expect(reducer(default_state, {
        type: BuildingActions.CHANGE_WALL_PROPERTY,
        wall: 'west',
        property: 'height',
        new_val: 11
      })).toEqual(new_state);


    })

  })

});
