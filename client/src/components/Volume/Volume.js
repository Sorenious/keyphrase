import React from 'react';
import Slider from 'material-ui/Slider';
import './Volume.css';

/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */
// class Slider extends Component {
//   state = {
//     slider: 0.5,
//   };

//   handleSlider = (event, value) => {
//     this.setState({slider: value});
//   };

//   render() {
//     return (
const Volume = props => 
      <div>
      <span id="volume">Volume</span><span id="knob"><Slider value={props.value} onChange={props.handleSlider} /></span>
      </div>;
//     );
//   }
// }

export default Volume;
