import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/home";

export default function Routing() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route path="*">
            <NoMatch />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}
