import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from "./App";
import "./index.css";

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3001');

var socket = io();

ReactDOM.render(
	<SocketProvider socket={socket}>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</SocketProvider>
, document.getElementById("root"));
