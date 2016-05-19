export const GET_CITY_DATA = 'GET_CITY_DATA';
export const SET_CITY_ID = 'SET_CITY_ID';

import WeatherApi from '../utils/weather-api.jsx';

export function getCityData() {

  return (dispatch, getState) => {

     dispatch({
       type: GET_CITY_DATA,
       promise: WeatherApi.getCityData(getState().environment.city_id)
     });

  }

}

export function setCityId(cityId) {

  return (dispatch) => {

    dispatch({
      type: SET_CITY_ID,
      newCityId: cityId
    });


    dispatch(this.getCityData()); // refresh city data

  }

}
