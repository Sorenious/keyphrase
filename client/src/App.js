import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Introduction from "./pages/Introduction";
import Game from "./pages/Game";
import NoMatch from "./pages/NoMatch";
import "./App.css";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Introduction} />
        <Route exact path="/board/:id" component={Game} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;