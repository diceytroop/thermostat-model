import { APPLY_THERMODYNAMICS } from '../actions/physics';

export const default_state = {

  last_applied: Date.parse(new Date())

}

export default function physics(state = default_state, action) {

  switch (action.type) {

    case APPLY_THERMODYNAMICS:
      Object.assign({}, state, {
        last_applied: state.last_applied + action.msSinceUpdate // Then + Date @ start of action, prevents leaking ms
      });

    default:
      return state;

  }

}
