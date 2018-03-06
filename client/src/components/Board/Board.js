import React from "react";
import "./Board.css";

const Board = props => <div className="board board5" style={{width: props.style}}>{props.children}</div>;

export default Board;
