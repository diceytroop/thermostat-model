import moment from 'moment';
require("moment-duration-format");
import React, { Component } from 'react';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = { on: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer() {
    this.setState({
      on: true,
      startTime: new Date()
    });
    console.log(this.props.dispatch);
    this.props.dispatch(this.props.setBaseTime());
  }

  stopTimer() {
    this.setState({
      on: false,
      startTime: undefined
    });
  }

  componentDidMount() {
    // this.timer = setInterval(this.tick, 1000);
  }

  componentWillUpdate() {
    if (this.state.on) {
      this.props.dispatch(this.props.applyThermodynamics());
    }
  }

  handleToggle() {
    if (this.state.on) {
      this.stopTimer();
    }
    else {
      this.startTimer();
    }
  }

  renderOnText() {

    var interval = new Date() - this.state.startTime;
    var duration = moment.duration(interval);
    return (<div className="timer-text">
      {duration.format("h:mm:ss:S")}
    </div>)

  }

  renderOffText() {
    return <div className="timer-text"><i>Timer is off.</i></div>
  }

  render() {
    var that = this;
    return (
      <div className="timer">
        <button className={"timer-toggle " + (that.state.on ? "timer-on" : "timer-off")}
                onClick={that.handleToggle}>
          {that.state.on ? "On" : "Off"}
        </button>
        {that.state.on ? that.renderOnText() : that.renderOffText()}
      </div>)

  }
};

export default Timer;
