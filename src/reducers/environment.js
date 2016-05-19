import { SET_CITY_ID, GET_CITY_DATA } from '../actions/environment';

export const default_state = {
  city_id: "5110302",
  city_name: "Brooklyn",
  temperature: ""
}

export default function environment ( state = default_state, action ) {


  switch (action.type) {

    case SET_CITY_ID:
      return Object.assign({}, state, {
        city_id: action.newCityId
      });
    case GET_CITY_DATA + '_SUCCESS':
      return Object.assign({}, state, {
        city_name: action.req.name,
        temperature: (9/5*(action.req.main.temp - 273) + 32)
      });
    default:
      return state;

  }



}
