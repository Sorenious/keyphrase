import React, { Component } from "react";
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

var board_room;
var socket;

// var socket;

// const styles = {
//   headline: {
//     fontSize: 24,
//     paddingTop: 16,
//     marginBottom: 12,
//     fontWeight: 400,
//   },
//   starter: {
//     backgroundColor: "#0000CC",
//   }
// };

// const connect = props => {
//   console.log(props, "Here's props");
// }

// connect();


class GameTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clueTab: false
    };

    this.handleClueTab = this.handleClueTab.bind(this);
  }

  componentWillMount() {
    console.log(this.props.match.url, "Here's props");
    board_room = this.props.match.url;
    socket = socket_connect(board_room);
    console.log(socket, "Socket");
  }

  handleClueTab = (event, name, status) => {
    console.log("ClueTab handled");
    socket.emit('role switch', name, status);
    this.setState({clueTab: !this.state.clueTab});
  }

  render() {
    return (
      <SocketProvider socket={socket}>
        {
          this.state.clueTab
          ?
          <Tabs>
            <Tab label="Clue Board (No Peeking!)" >
              <ClueGiver id={this.props.match.params.id} handleClueTab={this.handleClueTab} />
            </Tab>
          </Tabs>
          :
          <Tabs>
            <Tab label="Game Board" >
              <GameBoard id={this.props.match.params.id} handleClueTab={this.handleClueTab} />
            </Tab>
          </Tabs>
        }
      </SocketProvider>
    )
  }
};

export default GameTabs;
