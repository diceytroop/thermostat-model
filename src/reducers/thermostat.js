import { SET_MEASURED_TEMP, SET_THRESHHOLD } from '../actions/thermostat';

export var default_state = {
  threshhold: 65,
  last_measured_temp: null,
}

export default function thermostat(state = default_state, action) {

  switch(action.type) {

    case SET_MEASURED_TEMP:
      return Object.assign({}, state, {
        last_measured_temp: action.newTemp
      });
    case SET_THRESHHOLD:
      return Object.assign({}, state, {
        threshhold: action.newTemp
      });
    default:
      return state;
  }

};
