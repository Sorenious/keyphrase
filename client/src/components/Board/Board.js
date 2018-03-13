import React from "react";
import "./Board.css";

const Board = props => {
	return (
		<div>
		{
			props.style==="80%"
			?
			<div className="board board4" style={{width: props.style}}>{props.children}</div>
			:
			<div className="board board5" style={{width: props.style}}>{props.children}</div>
		}
		</div>
	)
};

export default Board;
