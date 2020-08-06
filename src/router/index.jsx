import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/logIn";
import NoAuthorisation from "../pages/noAuthorisation";
import NotFound from "../pages/notFound";
import ProtectedRoute from "./protectedRoute";

export default function Routing() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/no-authorisation" component={NoAuthorisation} />
          <Route path="/not-found" component={NotFound} />
          <ProtectedRoute exact path="/" component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </Router>
  );
}
