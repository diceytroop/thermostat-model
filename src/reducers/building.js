import {
  CHANGE_WALL_PROPERTY
} from '../actions/building';

export const default_state = {
  temperature: 65,
  east: {
    in_thick: 3,
    height: 10,
    length: 10,
    width: 10,
    inside_convection: 1.5,
    outside_convection: 6,
    wall_convection: 0.0318
  },
  west: {
    in_thick: 3,
    height: 10,
    length: 10,
    width: 10,
    inside_convection: 1.5,
    outside_convection: 6,
    wall_convection: 0.0318
  },
  north: {
    in_thick: 3,
    height: 10,
    length: 10,
    width: 10,
    inside_convection: 1.5,
    outside_convection: 6,
    wall_convection: 0.0318
  },
  south: {
    in_thick: 3,
    height: 10,
    length: 10,
    width: 10,
    inside_convection: 1.5,
    outside_convection: 6,
    wall_convection: 0.0318
  },
  roof: {
    in_thick: 3,
    height: 10,
    length: 10,
    inside_convection: 1.5,
    outside_convection: 6,
    wall_convection: 0.0318
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
