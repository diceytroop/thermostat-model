import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// EastWestWall and NorthSouthWall accept props and render a wall w/ interactive labels:
// wall: wall object,
// wall_name: wall name (east or west)
// changer: wall property changer
import EastWestWall from './building/EastWestWall';
import NorthSouthWall from './building/NorthSouthWall';
import PopOverDeets from './PopOverDeets';
class Roof extends Component {
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
    var x = (left+((right - left)/2))-17;
    var align;
    var y = top - 30;

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

  renderWallName() {
    if (this.state.mounted === true) {
      console.log("rendering wall name");
      console.log(this.generateStyle());
      return (<div className="wall_name" style={this.generateStyle()}>roof
      <PopOverDeets ref_name="roof"
          deets={this.props.roof} changer={this.props.changer}/></div>)
    }
  }

  render() {


    return (
      <div className="roof">
        {this.renderWallName()}
      </div>
    )
  }
}

// Editable Label takes props, displays label for props and enables changing the property
// wall_name: String, name of wall
// property: String, name of field
// description: Description, description of field for display
// current_value: Current value of property
// changer: changeWallProperty function
class EditableLabel extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, value: this.props.current_value }
    this.makeEditable = this.makeEditable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditField = this.handleEditField.bind(this);
  }
  handleChange(e) {
    this.setState({ value: e.target.value})
  }
  makeEditable() {
    if (this.state.editing !== true) {
      this.setState({ editing: !this.state.editing})
    }

  }
  handleEditField(event) {
    if (event.keyCode === 13) {
      let target = event.target, changeRequest = {};
      changeRequest.wall = this.props.wall_name;
      changeRequest.property = this.props.property;
      changeRequest.new_val = this.state.value;
      this.props.changer(changeRequest);
      this.setState({ editing: false });
    }
  }
  render() {
    return (
      <div className="editable-label">
        <div className="description">{this.props.description}</div>
        <input
           type="number"
           style={{width: (this.state.value.toString().length*20)+10}}
           value={this.state.value}
           onChange={this.handleChange}
           disabled={!this.state.editing}
           onMouseOver={this.makeEditable}
           onKeyDown={this.handleEditField}
           className="value" />

      </div>
    )
  }
}

class Building extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    var that = this;
    var changer = this.props.changeWallProperty;
    console.log(this.props);
    return (
      <div className="building">
        <h5 className="intro">This is the room being climate-controlled. </h5>

        <div className="roof-row">
          <Roof roof={this.props.roof} changer={changer}/></div>

        <div className="north-row">
          <NorthSouthWall wall={this.props.north}
                          wall_name="north"
                          changer={changer}/></div>

        <div className="east-west-row">
          <EastWestWall wall={this.props.west}
                        wall_name="west"
                        changer={changer}/>

                      <div className="building-inside">
            The actual current temperature indoors is {this.props.temperature} degrees F.
            {this.props.children} </div>

          <EastWestWall wall={this.props.east}
                        wall_name="east"
                        changer={changer}/> </div>

        <div className="south-row">
          <NorthSouthWall wall={this.props.south}
                          wall_name="south"
                          changer={changer}/> </div>
      </div>
        // The dimensions are {this.props.room_height}ft tall x {this.state.room_length}ft long x {this.state.room_width}ft wide. <br />
        // The walls and roof are {this.state.wall_thickness_inches} inches thick. <br />
      // TODO: integrate: The heat loss through the walls and roof is {this.state.btu_per_hour} BTU/hr. <br />

      )
  }
}
//

export default Building;
