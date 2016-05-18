export const CHANGE_WALL_PROPERTY = 'CHANGE_WALL_PROPERTY';

// changeWallProperty: takes change request, a la:
// const changeRequest = {
//  wall: 'west',
//  property: 'height',
//  new_val: '11'
// }
// and returns action:
// {
//    type: 'CHANGE_WALL_PROPERTY',
//    wall: 'west',
//    property: 'height',
//    new_val: '11'
// }
export function changeWallProperty(change_request) {

  var { wall, property, new_val } = change_request;

  var action = {
    type: CHANGE_WALL_PROPERTY,
    wall,
    property,
    new_val
  };
  return action;

}
