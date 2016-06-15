import _ from 'underscore';
import { MEASURE_TEMP } from './thermostat';

export const APPLY_THERMODYNAMICS = 'APPLY_THERMODYNAMICS';


// applyThermodynamics (null) -> side effects
// This function dispatches a series of actions:
// this.APPLY_THERMODYNAMICS: updates temperatures based on wall influence + radiator, notes Date (ms since epoch) calculated from.
// Thermostat.MEASURE_TEMP: triggers the Thermostat to check temp and determine whether to activate radiator
//
export function applyThermodynamics() {

  return (dispatch, getState) => {

    var last_applied = getState().physics.last_applied; // reducer must set this each time this is called
    var ms_since_update = new Date() - last_applied;

    var temp_influence_of_walls_since_update = tempInfluenceOfWallsSinceUpdate(getState, ms_since_update);

    if (getState().radiator.on) { // if radiator is on, calculate + include radiator effect when updating temp.
      var radiator_effect_since_last_update = radiatorEffect(getState, ms_since_update);
      dispatch({
        type: APPLY_THERMODYNAMICS,
        newInsideTemp: getState().building.temperature + temp_influence_of_walls_since_update + radiator_effect_since_last_update,
        msSinceUpdate: ms_since_update
      });

    } else {    // if radiator is off, we don't need to worry about it.
      dispatch({
        type: APPLY_THERMODYNAMICS,
        newInsideTemp: getState().building.temperature + temp_influence_of_walls_since_update,
        msSinceUpdate: ms_since_update
      });
    }

    // dispatch({
    //   type: MEASURE_TEMP
    // });




  }


}

// tempInfluenceOfWallsSinceUpdate(getState, ms_since_update) -> Number (degrees F, positive or negative)
export function tempInfluenceOfWallsSinceUpdate(getState, ms_since_update) {

  var { building } = getState();
  var walls = ['west', 'north', 'south', 'east', 'roof'];

  var influences_per_hour = _.map(walls, function(wall) {
    return tempInfluenceOfWallPerHour(building[wall], getState)
  });

  var influences = _.map(influences_per_hour, function(iph) {
    return degFPerHourTodegFPerMs(iph, ms_since_update);
  });

  return _.reduce(influences, function(memo, num) { return memo + num}, 0);

}

// tempInfluenceOfWall({wall}, getState) -> Number (degrees F, positive or negative)

export function tempInfluenceOfWallPerHour(wall, getState) {

  var area = wall.length * wall.height;

  var { building, environment } = getState();

  var influence = wallQ(wall, getState) / ( wall.inside_convection * area );

  if (building.temperature > environment.temperature) {
    return -1 * (wallQ(wall, getState) / ( wall.inside_convection * area ));
  }
  else {
    return wallQ(wall, getState) / ( wall.inside_convection * area );
  }

}

export function degFPerHourTodegFPerMs(deg_per_hour, ms) {
  return (deg_per_hour / 3600000) * ms;
}

// wallQ({wall}, getState) -> Number (Btu/h)
// examines wall + environment to determine rate of heat transfer for current conditions.
export function wallQ(wall, getState) {

  var { building, environment } = getState();
  var area = wall.length * wall.height; // area is in sqft
  var wall_conductivity = wmCToBTUHrFtF(wall.conductivity); // conductivity is in Btu/h-ft-degF)
  var ft_thick = inToFt(wall.in_thick); // ft_thick is obviously in feet

  var Q = ( area * (building.temperature - environment.temperature)) /
          ((1/wall.inside_convection) + ( ft_thick / wall_conductivity ) + ( 1/environment.outside_convection))

  return Q;

}


// UTILITY FUNCTIONS
function wmCToBTUHrFtF(wmc) { return (wmc * 0.5779).toFixed(6); }; // wmCToBTUHrFtF: Number (W/mdegC) -> Number (BTU/(ft h degF)
function wm2cToBTUHrFt2F(wm2c) { return wm2c * 0.1761 }; // wm2cToBTUHrFt2F: Number (W/m2degC) -> Number (BTU/(ft2 h degF)
function inToFt(inches) { return inches / 12 };

//radiatorEffect: getState() -> Number (degrees change since last update)
function radiatorEffect(getState, ms_since_update) {
  if (getState().radiator.on) {

    var btus = getState().radiator.BTUs;
    var mass = massOfAirInBuilding(getState().building);
    var capacity = /* approx. heat capacity of air, kcal/C */ 0.239

    return degreesFChangeOverInterval(btus, ms_since_update, mass, capacity);

  } else {
    return 0;
  }

}

// massOfAirInBuilding: {building} -> Number (kg)
export function massOfAirInBuilding(building) {

  var { west, east, north, south } = building;

  var z;
  var x;
  var y;

  // if all heights are not the same, warn & use biggest. TODO: implement polyhedron volume calculation for arbitrary shape.
  if (west.height === east.height && west.height === north.height && west.height===south.height) {
    z = west.height;
  } else {
    console.log('heights are not equal. using tallest height.');
    z = Math.max(west.height, east.height, north.height, south.height);
  }

  // if opposite lengths are not the same, warn and use biggest. TODO: '' '' ''
  if (west.length === east.length) {
    y = west.length;
  } else {
    console.log('west & east walls not equal, using longest length');
    y = Math.max(west.length, east.length);
  }

  if (north.length === south.length) {
    x = north.length;
  } else {
    console.log('north & south walls not equal, using longest length');
    x = Math.max(north.length, south.length);
  }

  var density = 1.24 // kg/m^3 . this should vary by temperature but for now we'll use a constant.

  function cubicFeetToCubicMeters(cubicFeet) {
    return 0.0283168*(cubicFeet);
  }

  return density * cubicFeetToCubicMeters(x*y*z);

}



// btuToKcalMs: Number (BTU/hr) -> Number (kcal/ms)
// 1 BTU/hr equals 7.00457e-8 kcal/ms. Milliseconds are the smallest unit of time JS supports.
// Not sure about the number of significant digits though.
// The number written out would be .0000000700457. Can JS represent that?
// Yup. OK. So here we go.
function btuToKcalMs(btu) {
  return btu*.0000000700457
}
// We want to know this so that we can calculate the BTU's effect on each ms that passes.

// degreesFChangeOverInterval: Number(BTU/hr), Number(mass of air in room), Number (Cp, heat capacity of air)
// -->> Number (degrees F change in that time)
export function degreesFChangeOverInterval(btu, ms, mass, capacity) {
  return ((ms*(btuToKcalMs(btu) / (mass * capacity))) * 1.8);
}

export function degreesFToC(f) {
  return f / 1.8
}
