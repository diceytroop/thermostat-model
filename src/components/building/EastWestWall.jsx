import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import PopOverDeets from '../PopOverDeets';

class EastWestWall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false
    };
    this.findTitlePosition = this.findTitlePosition.bind(this);
    this.setRect = this.setRect.bind(this);
  }

  setRect() {
    this.setState({
      rect: ReactDOM.findDOMNode(this).getBoundingClientRect(),
      mounted: true
    });
  }

  componentDidMount() {
    this.setRect();
  }


  findTitlePosition() {

    var { bottom, height, left, right, top, width } = this.state.rect
    console.log(this.state.rect);
    console.log(bottom);
    var y = top+((bottom - top)/2);
    var align;
    var x;

    if (this.props.wall_name === "west") {
      x = left - 85;
    }
    else {
      x = right + 20;
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
      return (<div className="wall_name" style={this.generateStyle()}>{this.props.wall_name + " wall"}
                <PopOverDeets ref_name={this.props.wall_name}
                    deets={this.props.wall} changer={this.props.changer} /></div>)
    }
  }

  render() {


    return (
      <div className="east-west">
        {this.renderWallNameAndInfoButton()}
      </div>
    )
  }
}

export default EastWestWall;
