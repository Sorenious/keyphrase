import React from "react";
import GameBoard from "../Tabs/GameBoard";
import ClueGiver from "../Tabs/ClueGiver";
import { socketConnect } from 'socket.io-react';
import {Tabs, Tab} from 'material-ui/Tabs';

const GameTabs = props => (
  <Tabs>
    <Tab label="Game Board" >
      <GameBoard id={props.match.params.id} />
    </Tab>
    <Tab label="Clue Board (No Peeking!)" >
      <ClueGiver id={props.match.params.id} />
    </Tab>
  </Tabs>
);

export default socketConnect(GameTabs);
