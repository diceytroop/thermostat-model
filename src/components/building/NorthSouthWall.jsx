import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PopOverDeets from '../PopOverDeets';

class NorthSouthWall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false
    };
    // this.findTitlePosition = this.findTitlePosition.bind(this);
  }

  componentDidMount() {
    console.log(ReactDOM.findDOMNode(this).getBoundingClientRect());
    this.setState({
      rect: ReactDOM.findDOMNode(this).getBoundingClientRect(),
      mounted: true
    });
  }

  findTitlePosition() {

    var { width } = this.state.rect
    var x = (width/2 - 30).toString(), y = ""
    if (this.props.wall_name === "north") {
      y = "-30";
    }
    else {
      y = "10";
    }
    return [x, y];
  }

  generateStyle() {
    var [ x, y ] = this.findTitlePosition();
    return {
      top: y,
      left: x
    }

  }

  renderWallNameAndInfoButton() {
    if (this.state.mounted === true) {
      console.log("rendering wall name");
      console.log(this.generateStyle());
      return (<div className="wall_name" style={this.generateStyle()}>{this.props.wall_name + " wall "}
                <PopOverDeets ref_name={this.props.wall_name}
                    deets={this.props.wall} changer={this.props.changer} />
                  </div>)
    }
  }

  render() {


    return (
      <div className="north-south">
        {this.renderWallNameAndInfoButton()}
      </div>
    )
  }
}

export default NorthSouthWall;
