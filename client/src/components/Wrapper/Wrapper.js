import React from "react";
import "./Wrapper.css";

const Wrapper = props => <div className="wrapper" style={{backgroundColor: props.colour}}>{props.children}</div>;

export default Wrapper;
