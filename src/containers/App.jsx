import _ from 'underscore';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as BuildingActions from '../actions/building';
import * as EnvironmentActions from '../actions/environment';
import * as PhysicsActions from '../actions/physics';
import * as RadiatorActions from '../actions/radiator';
import * as ThermostatActions from '../actions/thermostat';

import Environment from '../components/environment';
import Building from '../components/building';
import Thermostat from '../components/thermostat';
import Timer from '../components/timer';
import Radiator from '../components/radiator';

import DevTools from '../devtools';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    var { environment, building, physics, thermostat, radiator } = this.props;

    console.log(this.props);

    return (
      <div className="container">
        <Timer {...this.props} />
        <Environment {...this.props.environment}>
            <Building {...this.props.building} changeWallProperty={this.props.changeWallProperty}>
              <Thermostat {...this.props.thermostat}/>
              <Radiator {...this.props.radiator}/>
            </Building>
          </Environment>
          <DevTools />
      </div>
    )
  }
}

var mapStateToProps = function(state) {
  console.log(state);
  return {
    building: state.building,
    environment: state.environment,
    physics: state.physics,
    radiator: state.radiator,
    thermostat: state.thermostat
  }

}

function mapDispatchToProps(dispatch) {

  var allActions = _.extendOwn({}, BuildingActions,
                            EnvironmentActions,
                            PhysicsActions,
                            RadiatorActions,
                            ThermostatActions);

  return {
    ...bindActionCreators(allActions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
