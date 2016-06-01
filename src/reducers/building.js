import {
  CHANGE_WALL_PROPERTY
} from '../actions/building';


// conductivity is in W/m K. currently set walls as oak material, roof as roof panel. TODO: implement materials lookup table for walls.

export const default_state = {
  temperature: 65,
  east: {
    in_thick: 3,
    height: 10,
    length: 10,
    conductivity: 0.117,
    inside_convection: 1.5 // BTU/hr/ft2-degR
  },
  west: {
    in_thick: 3,
    height: 10,
    length: 10,
    conductivity: 0.117,
    inside_convection: 1.5 // BTU/hr/ft2-degR
  },
  north: {
    in_thick: 3,
    height: 10,
    length: 10,
    conductivity: 0.117,
    inside_convection: 1.5 // BTU/hr/ft2-degR
  },
  south: {
    in_thick: 3,
    height: 10,
    length: 10,
    conductivity: 0.117,
    inside_convection: 1.5 // BTU/hr/ft2-degR
  },
  roof: {
    in_thick: 3,
    width: 10,
    length: 10,
    conductivity: 0.84,
    inside_convection: 1.5 // BTU/hr/ft2-degR
  }
}

export default function building(state = default_state, action) {

  switch (action.type) {

    case CHANGE_WALL_PROPERTY:
      return Object.assign({}, state, {
        ...state,
        [action.wall]: {
          ...state[action.wall],
          [action.property]: action.new_val
        }
      });
    default:
      return state;
  }

}
