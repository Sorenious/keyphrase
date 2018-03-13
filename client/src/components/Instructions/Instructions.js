import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class InstructionDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => {
  	this.setState({open: !this.state.open});
  	console.log(this.props, "Instruction props");
  	
  }

  render() {
    return (
      <div>
        <button
          label="Instructions"
          onClick={this.handleToggle}
        >
        Instructions
        </button>
        <Drawer open={this.state.open}>
          <MenuItem>Filler</MenuItem>
        </Drawer>
      </div>
    );
  }
}