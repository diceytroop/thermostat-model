import { RADIATOR_ON, RADIATOR_OFF } from '../actions/thermostat';
import { SET_BTUS } from '../actions/radiator';

export var default_state = {
  BTUs: 1000,
  on: false
}


export default function radiator(state = default_state, action) {
  switch(action.type) {
    case RADIATOR_ON:
      return Object.assign({}, state, {
        on: true
      });
    case RADIATOR_OFF:
      return Object.assign({}, state, {
        on: false
      });
    case SET_BTUS:
      return Object.assign({}, state, {
        BTUs: action.newBTUs
      })
    default:
      return state;
  }
};
