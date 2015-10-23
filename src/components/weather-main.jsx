var React = require('react');
var Environment = require('./environment.jsx');
var Timer = require('./timer.jsx');

module.exports = React.createClass({
  render: function() {

    return (<div>
      <Environment />
    </div>)
  }
  // content: function() {
  //   if(this.props.children) {
  //     return this.props.children
  //   } else {
  //     return <TopicList />;
  //   }
  // }
});
