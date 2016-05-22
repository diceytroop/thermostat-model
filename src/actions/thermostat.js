export const RADIATOR_ON = 'RADIATOR_ON';
export const RADIATOR_OFF = 'RADIATOR OFF';
export const MEASURE_TEMP = 'MEASURE_TEMP';
export const SET_MEASURED_TEMP = 'SET_MEASURED_TEMP';
export const REACT_TO_TEMP = 'REACT_TO_TEMP';
export const SET_THRESHHOLD = 'SET_THRESHHOLD';

export function radiatorOn() {

  return {
    type: RADIATOR_ON,
  }
}

export function radiatorOff() {
  return {
    type: RADIATOR_OFF
  }
}

export function measureTemp() {

  return (dispatch, getState) => {

    dispatch({type: MEASURE_TEMP});
    var temperature = getState().building.temperature;
    dispatch(this.setMeasuredTemp(temperature));
    dispatch(this.reactToTemp());

  }

}

export function setMeasuredTemp(newTemp) {

  return {
    type: SET_MEASURED_TEMP,
    newTemp
  }

}

export function reactToTemp() {

  return (dispatch, getState) => {
    dispatch({type: REACT_TO_TEMP});
    const threshhold = getState().thermostat.threshhold;
    const measuredTemp = getState().thermostat.last_measured_temp;
    const radiatorOn = getState().radiator.on;
    if (threshhold > measuredTemp && !radiatorOn) {
      dispatch(this.radiatorOn());
    }
  }

}

export function setThreshhold(newTemp) {

  return {
    type: SET_THRESHHOLD,
    newTemp
  }

}
