import React from "react";
import GameBoard from "../Tabs/GameBoard";
import ClueGiver from "../Tabs/ClueGiver";
import { socketConnect } from 'socket.io-react';
import {Tabs, Tab} from 'material-ui/Tabs';

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

const GameTabs = props => (
  <Tabs>
    <Tab label="Game Board" style={styles.starter} >
      <GameBoard id={props.match.params.id} />
    </Tab>
    <Tab label="Clue Board (No Peeking!)" style={styles.starter} >
      <ClueGiver id={props.match.params.id} />
    </Tab>
  </Tabs>
);

export default socketConnect(GameTabs);
