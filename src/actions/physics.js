import _ from 'underscore';

export const APPLY_THERMODYNAMICS = 'APPLY_THERMODYNAMICS';

export function applyThermodynamics() {

  return (dispatch, getState) => {

    var last_applied = getState().physics.last_applied; // reducer must set this each time this is called
    var ms_since_update = new Date() - last_applied;

    var heat_loss_since_last_update = heatLossFromWallsInFSinceUpdate(getState, ms_since_update);


    console.log('heat loss since last update is ' + heat_loss_since_last_update );


    if (getState().radiator.on) { // if radiator is on, calculate + include radiator effect when updating temp.

      var radiator_effect_since_last_update = radiatorEffect(getState, ms_since_update);
      console.log(radiator_effect_since_last_update);
      dispatch({
        type: APPLY_THERMODYNAMICS,
        newTemp: getState().building.temperature - heat_loss_since_last_update + radiator_effect_since_last_update,
        msSinceUpdate: ms_since_update
      });

    } else {    // if radiator is off, we don't need to worry about it.
      dispatch({
        type: APPLY_THERMODYNAMICS,
        newTemp: getState().building.temperature - heat_loss_since_last_update,
        msSinceUpdate: ms_since_update
      });
    }





  }


}

function heatLossFromWallsInFSinceUpdate(getState, ms_since_update) {

  var building = getState().building;

  var { west, north, south, east, roof } = building;

  var totalBTULoss = heatLossFromWall(west, ms_since_update, getState) +
         heatLossFromWall(north, ms_since_update, getState) +
         heatLossFromWall(south, ms_since_update, getState) +
         heatLossFromWall(east, ms_since_update, getState) +
         heatLossFromWall(roof, ms_since_update, getState);

  return totalBTULoss / building.inside_convection

}

export function heatLossFromWall(wall, ms, getState) {

  // using this as a guideline: http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/heatloss.html
  // amd http://www.learnthermo.com/examples/ch04/p-4b-2.php

  // loss/time = surface area (sqft) * (temp difference) / thermal resistance.
  // thermal resistance is a little weird here, w/ imperial measurements.
  // it is a weird composite marketing measurement, the "r-factor", which is sqft * F / BTU/hr.
  // to turn a k-value (w/m K) to an R value you must use:
  // R-value = thickness / K-value
  //

  // returns number of BTU transferred in given time in ms.

  return (btuPerHour(wall, getState) / 360000) * ms

}

export function btuPerHour(wall, getState) {

  var value = (wall.length*wall.height) * (getState().building.temperature - getState().environment.temperature)
                / kToR(wall.conductivity, wall.in_thick);

  return value;

}

export function kToR(kval, wall_thickness_inches) {
    return wall_thickness_inches * (1 / (kval * 6.9334713)); // 	6.9334713 = conversion factor for W/m K to BTU in / hr sqft F
}

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
