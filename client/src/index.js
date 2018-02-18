import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

ReactDOM.render(
	<SocketProvider socket={socket}>
		<App />
	</SocketProvider>
, document.getElementById("root"));
