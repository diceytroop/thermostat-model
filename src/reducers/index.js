import { combineReducers } from 'redux';

import building from './building';
import environment from './environment';
import physics from './physics';
import radiator from './radiator';
import thermostat from './thermostat';

const rootReducer = combineReducers({
  building,
  environment,
  physics,
  radiator,
  thermostat
});

console.log(rootReducer(undefined, {type: "TEST"}));

export default rootReducer;
