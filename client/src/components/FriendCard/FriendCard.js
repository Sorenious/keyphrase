import React from "react";
import "./FriendCard.css";

const FriendCard = props => (

  <div className="card" style={{backgroundImage: "url("+props.image+")"}} onClick={() => {props.revealFunction(props.id)}}>
    {props.children}
    
  </div>
);

export default FriendCard;
