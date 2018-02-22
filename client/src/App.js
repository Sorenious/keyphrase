import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameBoard from "./pages/GameBoard";
import ClueGiver from "./pages/ClueGiver";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import "./App.css";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={GameBoard} />
        <Route exact path="/clue" component={ClueGiver} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;