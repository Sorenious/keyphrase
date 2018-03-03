import React from "react";
import GameBoard from "../Tabs/GameBoard";
import ClueGiver from "../Tabs/ClueGiver";
import {Tabs, Tab} from 'material-ui/Tabs';

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3001');

var socket_connect = function (room) {
    return io('keyphrase.herokuapp.com', {
        query: 'r_var='+room
    });
}

let board_room;
let socket;

// var socket;

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  starter: {
    backgroundColor: "#0000CC",
  }
};

// const connect = props => {
//   console.log(props, "Here's props");
// }

// connect();

const GameTabs = props => {
  console.log(props.match.url, "Here's props");
  board_room = props.match.url;
  socket = socket_connect(board_room);

  return <SocketProvider socket={socket}>
    <Tabs>
      <Tab label="Game Board" style={styles.starter} >
        <GameBoard id={props.match.params.id} />
      </Tab>
      <Tab label="Clue Board (No Peeking!)" style={styles.starter} >
        <ClueGiver id={props.match.params.id} />
      </Tab>
    </Tabs>
  </SocketProvider>
};

export default GameTabs;
