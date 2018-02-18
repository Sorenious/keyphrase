import React from "react";
import "./ColourCard.css";

const ColourCard = props => (

  <div className="card" style={{backgroundColor: props.colour}}>
    {props.children}
  </div>
);

export default ColourCard;
