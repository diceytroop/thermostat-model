import React, { Component } from 'react';
import _ from 'underscore';
import ReactDOM from 'react-dom';

// Editable Deet takes props, displays label for props and enables changing the property
// ref_name: String, name of wall
// property: String, name of field
// description: Description, description of field for display
// current_value: Current value of property
// changer: changeWallProperty function
class EditableDeet extends Component {
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
      changeRequest.wall = this.props.ref_name;
      changeRequest.property = this.props.property;
      changeRequest.new_val = this.state.value;
      this.props.changer(changeRequest);
      this.setState({ editing: false });
    }
  }
  render() {
    return (
      <div className="editable-label">
        <div className="description">{this.props.description || this.props.property}</div>
        <input
           type="number"
           style={{width: "50px"}}
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


// PopOverDeets takes props:
// deets: Object containing details (i.e., wall)
// ref_name: String, name of reference for use in changer
// changer: changeWallProperty function

class PopOverDeets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      popover: false,
      mounted: false
    }
    this.togglePopover = this.togglePopover.bind(this);
    this.renderEditableDeets = this.renderEditableDeets.bind(this);
    this.calculatePosition = this.calculatePosition.bind(this);
    this.renderPopOverDeets = this.renderPopOverDeets.bind(this);
  }

  componentDidMount() {
    this.setState({
      rect: ReactDOM.findDOMNode(this).getBoundingClientRect(),
      mounted: true
    });
  }

  togglePopover() {
    if (this.state.popover) {
      this.setState({ popover: false });
    } else {
      this.setState({ popover: true });
    }
  }

  renderEditableDeets() {

    var that = this;
    var deets = []
    _.mapObject(this.props.deets, function(val, key) {

      deets.push(<EditableDeet key={that.props.ref_name + "_" + key}
                          ref_name={that.props.ref_name} property={key}  description={key}
                          current_value={val} changer={that.props.changer} />)

                      });

    console.log(deets);
    return deets;


  }

  calculatePosition() {
    var { top, bottom, left, width } = this.state.rect;
    let style = {
      top: "15px",
      left: (width/2)
    }
    return style;
  }

  renderPopOverDeets() {
    return <div className="popover-deets" style={this.calculatePosition()}>
      {this.renderEditableDeets()}
    </div>
  }

  render() {
    console.log(this.togglePopover);
    var returning =
      (<div className="info-container">
        <div className="info" onClick={this.togglePopover}>ℹ️</div>
        {(() => { if (this.state.popover) { return this.renderPopOverDeets() } })()}
    </div>)
    return returning;
  }
}

export default PopOverDeets
