import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PopOverDeets from '../PopOverDeets';

class NorthSouthWall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false
    };
    this.findTitlePosition = this.findTitlePosition.bind(this);
  }

  componentDidMount() {
    console.log(ReactDOM.findDOMNode(this).getBoundingClientRect());
    this.setState({
      rect: ReactDOM.findDOMNode(this).getBoundingClientRect(),
      mounted: true
    });
  }

  findTitlePosition() {

    var { bottom, height, left, right, top, width } = this.state.rect
    console.log(this.state.rect);
    console.log(bottom);
    var x = (left+((right - left)/2))-35;
    var align;
    var y;

    if (this.props.wall_name === "north") {
      y = top - 30;
    }
    else {
      y = bottom + 5;
    }
    return [x, y];
  }

  generateStyle() {
    var [ x, y ] = this.findTitlePosition();
    console.log(x, y);
    return  {
      top: y,
      left: x
    };
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
