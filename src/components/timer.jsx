var React = require('react');

module.exports = React.createClass({
  displayName: "timer",
  getInitialState: function() {
    return {
      start: new Date(),
      countdown: this.props.interval
    }
  },
  componentDidMount: function() {
    this.timer = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.timer);
  },
  tick: function() {
    // console.log("time elapsed: " + (new Date - this.state.start)/1000 + ", start " + this.state.start);
    this.setState({countdown: this.state.countdown - 1});
    if (this.state.countdown <= 0) {
      this.setState({start: new Date,
                    countdown: this.props.interval});
      this.handleTrigger();
    }
  },
  handleTrigger: function() {
    this.props.trigger(this.props.args);
  },
  render: function() {
    return (
    <div className="timer">Updates in {this.state.countdown} seconds.</div>)
  }
});
